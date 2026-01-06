document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow dropdown links to work normally
            if (this.classList.contains('dropdown-toggle')) {
                return;
            }
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
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
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 1)';
            navbar.style.padding = '5px 0';
        } else {
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
            navbar.style.padding = '10px 0';
        }
    });
});