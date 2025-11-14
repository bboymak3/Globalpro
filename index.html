// Inicialización de AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Variables para el menú móvil
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    // Función para abrir/cerrar el menú móvil
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
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
    
    // Evento para el botón del menú móvil
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Evento para el overlay (cerrar menú al hacer clic)
    overlay.addEventListener('click', toggleMobileMenu);
    
    // Eventos para los dropdowns del menú móvil
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetMenu = document.getElementById(targetId);
            
            // Cerrar otros dropdowns abiertos
            document.querySelectorAll('.mobile-dropdown-menu').forEach(menu => {
                if (menu.id !== targetId && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                }
            });
            
            // Alternar el dropdown actual
            targetMenu.classList.toggle('active');
            
            // Rotar la flecha
            const arrow = this.querySelector('span');
            if (targetMenu.classList.contains('active')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Cerrar menú al hacer clic en un enlace
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-item');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Restablecer el botón hamburguesa
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Cerrar todos los dropdowns
            document.querySelectorAll('.mobile-dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
            
            // Restablecer flechas
            document.querySelectorAll('.mobile-dropdown-toggle span').forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
            });
        });
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de sombra en el navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.main-nav');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Prevenir el comportamiento por defecto de los enlaces que no tienen href
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});

// Agregar clase no-scroll al body cuando el menú está abierto
document.head.insertAdjacentHTML('beforeend', `
<style>
    body.no-scroll {
        overflow: hidden;
    }
</style>
`);