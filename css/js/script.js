// ANIMATIONS AU CHARGEMENT
document.addEventListener('DOMContentLoaded', function() {
    // Animation des éléments au scroll
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

    // Observer tous les cards et sections
    document.querySelectorAll('.service-card, .portfolio-card, .stat-item, .value').forEach(el => {
        observer.observe(el);
    });

    // Initialiser les animations des stats
    animateStatistics();

    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scroll pour les liens de navigation
    smoothScroll();

    // Animation du hero au chargement
    animateHero();
});

// ANIMATION HERO
function animateHero() {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.animation = 'slideUp 0.8s ease forwards';
    }
}

// ANIMATION STATISTIQUES
function animateStatistics() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.textContent);
                
                if (!isNaN(target)) {
                    animateNumber(element, target);
                    statsObserver.unobserve(element);
                }
            }
        });
    });

    stats.forEach(stat => statsObserver.observe(stat));
}

// ANIMER UN NOMBRE
function animateNumber(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 50);
    const originalText = element.textContent;
    const suffix = originalText.replace(/[0-9]/g, '');

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

// SMOOTH SCROLL
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// GESTION DU FORMULAIRE DE CONTACT
function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Validation simple
    if (!data.get('Votre nom')) {
        alert('Veuillez entrer votre nom');
        return;
    }
    if (!data.get('Votre email')) {
        alert('Veuillez entrer votre email');
        return;
    }

    // Afficher un message de succès
    showSuccessMessage(this);

    // Réinitialiser le formulaire
    this.reset();

    // En production, envoyer les données au serveur
    // sendFormToServer(data);
}

// AFFICHER MESSAGE DE SUCCÈS
function showSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = '✓ Merci! Nous vous recontacterons bientôt.';
    message.style.cssText = `
        background-color: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        animation: slideUp 0.3s ease;
    `;

    form.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 5000);
}

// AJOUTER ANIMATIONS CSS DYNAMIQUES
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .animate-in {
        animation: slideUp 0.6s ease forwards !important;
    }

    .success-message {
        animation: slideUp 0.3s ease forwards !important;
    }

    .scroll-hidden {
        opacity: 0;
        transform: translateY(30px);
    }
`;
document.head.appendChild(style);

// DÉTECTION DU SCROLL POUR NAVBAR
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ajouter une ombre à la navbar lors du scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// PARALLAX EFFECT (OPTIONNEL)
window.addEventListener('scroll', function() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrollPosition = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// COMPTEUR DE VISITE (OPTIONNEL)
function initVisitorCounter() {
    let visits = localStorage.getItem('synesis-visits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('synesis-visits', visits);
    
    console.log(`Nombre de visites: ${visits}`);
}

initVisitorCounter();

// FONCTION D'ENVOI (DÉCOMMENTER POUR UTILISER)
/*
async function sendFormToServer(data) {
    try {
        const response = await fetch('https://votre-serveur.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            console.log('Message envoyé avec succès!');
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
    }
}
*/

// LOG POUR DÉBOGUER
console.log('SYNESIS GROUP - Site officiel');
console.log('Version: 1.0.0');
console.log('Tous les scripts sont chargés et prêts!');
