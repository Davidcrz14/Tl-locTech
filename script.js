//Te extraño condenada
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a, button, .feature-card').forEach(element => {
        element.classList.add('smooth-transition');
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.setAttribute('aria-controls', 'mobile-menu');

        mobileMenuButton.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('open');
            mobileMenuButton.classList.toggle('open');
        });
    }

    const whatsappButton = document.getElementById('whatsapp-button');
    const nameInput = document.getElementById('name');

    if (whatsappButton && nameInput) {
        whatsappButton.addEventListener('click', function () {
            const name = nameInput.value.trim();
            const baseMessage = name ? `Hola TlálocTech, mi nombre es ${name} y me gustaría saber más sobre sus productos.` : 'Hola TlálocTech, me gustaría saber más sobre sus productos.';
            const encodedMessage = encodeURIComponent(baseMessage);
            const whatsappUrl = `https://wa.me/5219512533379?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });

                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    if (mobileMenuButton) mobileMenuButton.classList.remove('open');
                }
            }
        });
    });

    const revealElements = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    checkReveal();
    window.addEventListener('scroll', checkReveal);

    const logo = document.querySelector('nav h1');
    if (logo) {
        logo.classList.add('water-drop');
    }
});
