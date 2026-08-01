/* ========================================
   SYNESIS GROUP - JAVASCRIPT PROFESSIONNEL
   Interactivité et Fonctionnalités Avancées
   ======================================== */

// INITIALISATION AU CHARGEMENT
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initFormValidation();
    initScrollEffects();
    initSmoothScroll();
    logInitialization();
});

// ========== ANIMATIONS ==========
function initAnimations() {
    // Observer pour animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Appliquer l'observer aux éléments
    document.querySelectorAll('.service-feature, .stat-card, .commitment-item, .pillar, .activity-card, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Animer les statistiques au scroll
    animateCounters();
}

// Animation des compteurs de statistiques
function animateCounters() {
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.querySelector('.stat-number');
                if (number && !number.dataset.animated) {
                    animateCounter(number);
                    number.dataset.animated = 'true';
                    counterObserver.unobserve(entry.target);
                }
            }
        });
    });

    document.querySelectorAll('.stat-card').forEach(card => {
        counterObserver.observe(card);
    });
}

function animateCounter(element) {
    const targetText = element.textContent;
    const target = parseInt(targetText.replace(/\D/g, ''));
    const suffix = targetText.replace(/[0-9]/g, '');
    
    if (isNaN(target)) return;

    let current = 0;
    const increment = Math.ceil(target / 50);
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(interval);
        } else {
            element.textContent = current + suffix;
        }
    }, 20);
}

// ========== FORMULAIRE CONTACT ==========
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Validation en temps réel
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('change', validateField);
    });
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Validations spécifiques
    if (field.name === 'name' && value.length < 3) {
        isValid = false;
        errorMessage = 'Le nom doit contenir au moins 3 caractères';
    }

    if (field.name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Adresse email invalide';
        }
    }

    if (field.name === 'phone' && value && value.length < 8) {
        isValid = false;
        errorMessage = 'Numéro de téléphone invalide';
    }

    if (field.name === 'message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Le message doit contenir au moins 10 caractères';
    }

    // Appliquer la validation visuelle
    if (!isValid && value) {
        field.classList.add('error');
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = 'color: #D32F2F; font-size: 0.85rem; margin-top: 0.3rem;';
            errorDiv.textContent = errorMessage;
            field.parentElement.appendChild(errorDiv);
        }
    } else {
        field.classList.remove('error');
        if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
            field.nextElementSibling.remove();
        }
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    let isFormValid = true;

    // Valider tous les champs obligatoires
    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            isFormValid = false;
            field.classList.add('error');
        } else {
            validateField({ target: field });
            if (field.classList.contains('error')) {
                isFormValid = false;
            }
        }
    });

    if (!isFormValid) {
        showNotification('Veuillez corriger les erreurs du formulaire', 'error');
        return;
    }

    // Récupérer les données
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simuler l'envoi (en production, envoyer au serveur)
    console.log('Données de formulaire:', data);
    showNotification('✓ Message envoyé avec succès! Nous vous recontacterons bientôt.', 'success');

    // Réinitialiser le formulaire
    form.reset();
    form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
}

// Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 6px;
        font-weight: 600;
        z-index: 10000;
        animation: slideUp 0.3s ease;
        background: ${type === 'success' ? '#4CAF50' : '#D32F2F'};
        color: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ========== SCROLL EFFECTS ==========
function initScrollEffects() {
    // Navbar shadow au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }
    });

    // Parallax effet
    initParallax();
}

function initParallax() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== UTILITAIRES ==========
function logInitialization() {
    console.log('%cSYNESIS GROUP', 'font-size: 24px; font-weight: bold; color: #0071BC;');
    console.log('%cSite Web Professionnel', 'font-size: 14px; color: #00A6D6;');
    console.log('%cVersion: 1.0.0 | BÂTIR L\'AVENIR', 'font-size: 12px; color: #666;');
    console.log('All systems initialized successfully ✓');
}

// Performance monitoring
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    }
});

// ========== LOCAL STORAGE ==========
function saveUserPreferences() {
    const preferences = {
        theme: 'light',
        language: 'fr',
        visitDate: new Date().toISOString()
    };
    localStorage.setItem('synesis_prefs', JSON.stringify(preferences));
}

function loadUserPreferences() {
    const prefs = localStorage.getItem('synesis_prefs');
    if (prefs) {
        return JSON.parse(prefs);
    }
    return null;
}

// Initialize preferences
if (!loadUserPreferences()) {
    saveUserPreferences();
}

// Visitor counter
function trackVisit() {
    let visits = parseInt(localStorage.getItem('synesis_visits') || '0') + 1;
    localStorage.setItem('synesis_visits', visits);
    console.log(`Visite #${visits} - Merci de votre intérêt pour SYNESIS GROUP`);
}

trackVisit();
