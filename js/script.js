/* ===================================
   SYNESIS GROUP - JAVASCRIPT INTERACTIF
   Fonctionnalités Dynamiques
   =================================== */

// ===== VALIDATION FORMULAIRE =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const company = document.getElementById('company').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Validation basique
            if (!name) {
                showAlert('Veuillez entrer votre nom', 'error');
                return;
            }
            
            if (!email || !validateEmail(email)) {
                showAlert('Veuillez entrer un email valide', 'error');
                return;
            }
            
            if (!service) {
                showAlert('Veuillez sélectionner un service', 'error');
                return;
            }
            
            if (!message) {
                showAlert('Veuillez entrer votre message', 'error');
                return;
            }
            
            // Afficher message de succès
            showAlert('✓ Message envoyé avec succès! Nous vous contacterons bientôt.', 'success');
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Optionnel: Envoyer à un service (Formspree, etc.)
            // sendFormData(name, email, phone, company, service, message);
        });
    }
});

// ===== VALIDATION EMAIL =====
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ===== AFFICHER ALERTES =====
function showAlert(message, type) {
    // Créer l'élément alerte
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1001;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(alert);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// ===== ANIMATIONS KEYFRAMES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== SMOOTH SCROLL POUR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== DÉTECTION SCROLL POUR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments de card
document.querySelectorAll('.stat-card, .activity-card, .project-card, .commitment-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== COMPTEUR STATS (ANIMATION) =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target > 50 ? '+' : '');
    }, 30);
}

// Observer pour les stats
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(el => {
                const text = el.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(el, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== MENU MOBILE TOGGLE (Optionnel) =====
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'mobile-toggle';
        toggle.innerHTML = '☰';
        toggle.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            display: none;
        `;
        
        toggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
        
        navbar.appendChild(toggle);
    }
}

setupMobileMenu();

// ===== ACTIVE NAV LINK (Mise en évidence du lien actif) =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== STYLE POUR NAV ACTIVE =====
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #F5F5F5 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// ===== PARALLAX EFFECT (Optionnel) =====
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== ANALYTICS PLACEHOLDER =====
// À remplacer par Google Analytics
function trackEvent(eventName, eventData) {
    console.log('Event tracked:', eventName, eventData);
    // Implémenter Google Analytics si nécessaire
    // gtag('event', eventName, eventData);
}

// Tracker les clics de bouton
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', {
            button_text: btn.textContent
        });
    });
});

// ===== FORMULAIRE - INTÉGRATION FORMSPREE (Optionnel) =====
// Remplacer par votre email Formspree si activé
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';

async function sendFormData(name, email, phone, company, service, message) {
    // Si Formspree est configuré, décommenter:
    /*
    try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                company: company,
                service: service,
                message: message,
                _subject: `Nouveau message de ${name} - SYNESIS GROUP`
            })
        });
        
        if (response.ok) {
            showAlert('✓ Message envoyé avec succès!', 'success');
        } else {
            showAlert('Erreur lors de l\'envoi du message', 'error');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showAlert('Erreur lors de l\'envoi du message', 'error');
    }
    */
}

// ===== LOGGER INITIALISATION =====
console.log('%c✓ SYNESIS GROUP Site Loaded', 'color: #0071BC; font-size: 16px; font-weight: bold;');
console.log('Version: 1.0.0 | Built with ❤️ for SYNESIS GROUP');
