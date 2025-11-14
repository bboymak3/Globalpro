// Inicializar AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Menú móvil - Código completamente funcional
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    
    // Función para abrir/cerrar menú móvil
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
        // Animación del botón hamburguesa
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Evento para el botón del menú hamburguesa
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Evento para cerrar menú al hacer clic en el overlay
    overlay.addEventListener('click', toggleMobileMenu);
    
    // Evento para cerrar menú al hacer clic en un enlace
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-item');
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
    
    // Dropdowns móviles
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetMenu = document.getElementById(targetId);
            
            // Cerrar otros dropdowns abiertos
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherTargetId = otherToggle.getAttribute('data-target');
                    const otherTargetMenu = document.getElementById(otherTargetId);
                    otherTargetMenu.classList.remove('active');
                }
            });
            
            // Abrir/cerrar el dropdown actual
            targetMenu.classList.toggle('active');
        });
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});