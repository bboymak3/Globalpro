document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica del Menú Móvil y Dropdowns ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const desktopMenu = document.getElementById('desktopMenu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Toggle del menú principal en móvil
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            desktopMenu.classList.toggle('show');
        });
    }

    // Toggle de los submenús (dropdowns) en móvil
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Evita que el enlace navegue si estamos en móvil
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                dropdownMenu.classList.toggle('show');
            }
        });
    });

    // Cierra el menú si se hace clic fuera de él (opcional, pero buena práctica)
    window.addEventListener('click', function(e) {
        if (!desktopMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            desktopMenu.classList.remove('show');
        }
    });


    // --- Smooth Scrolling para enlaces de ancla ---
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], .dropdown-item[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Permite que los dropdowns funcionen, pero evita la navegación si el href es solo "#"
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                return;
            }
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                e.preventDefault(); // Prevenir el salto brusco
                const navbarHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Cierra el menú móvil si está abierto
                if (desktopMenu.classList.contains('show')) {
                    desktopMenu.classList.remove('show');
                }
            }
        });
    });

    // --- WhatsApp Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (contactForm.checkValidity()) {
                const nombre = document.getElementById('nombre').value;
                const telefono = document.getElementById('telefono').value;
                const vehiculo = document.getElementById('vehiculo').value;
                const servicio = document.getElementById('servicio').value;
                const comuna = document.getElementById('comuna').value;
                const mensaje = document.getElementById('mensaje').value;

                const whatsappMessage = `Hola GlobalPro, quiero solicitar una cotización/agendar una cita:%0A%0A` +
                    `*Nombre:* ${nombre}%0A` +
                    `*Teléfono/WhatsApp:* ${telefono}%0A` +
                    `*Vehículo:* ${vehiculo}%0A` +
                    `*Comuna:* ${comuna}%0A` +
                    `*Servicio Requerido:* ${servicio}%0A` +
                    `*Mensaje:* ${mensaje}`;

                const whatsappUrl = `https://wa.me/56939026185?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
            }
            contactForm.classList.add('was-validated');
        });
    }
    
    // --- Change Navbar Style on Scroll ---
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.main-nav');
        if (window.scrollY > 50) {
            navbar.style.padding = '5px 0';
        } else {
            navbar.style.padding = '10px 0';
        }
    });
});