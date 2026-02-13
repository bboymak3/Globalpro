import { Wrench, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react';

const quickLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Soluciones', href: '#soluciones' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Galería', href: '#galeria' },
  { name: 'Marcas', href: '#marcas' },
  { name: 'A Domicilio', href: '#domicilio' },
  { name: 'Contacto', href: '#contacto' },
];

const services = [
  'Mecánica General',
  'Electricidad Automotriz',
  'Aire Acondicionado',
  'Frenos y Suspensión',
  'Chapa y Pintura',
  'Diagnóstico Computarizado',
  'Servicio a Domicilio',
  'Emergencia 24/7'
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white-50">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gp-blue p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg tracking-wide text-white">GLOBALPRO</div>
                <div className="text-gray-500 text-xs">Taller Mecánico</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Taller mecánico especializado en servicio automotriz integral. 
              Mecánica general, electromecánica, chapa y pintura. 
              Servicio a domicilio en Santiago.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gp-red transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gp-red transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gp-red transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-gray-400 hover:text-gp-red transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Nuestros Servicios</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gp-red" />
                <a
                  href="tel:+56939026185"
                  className="text-gray-400 hover:text-gp-red transition-colors"
                >
                  +56 9 3902 6185
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gp-red" />
                <a
                  href="mailto:contacto@globalpro.cl"
                  className="text-gray-400 hover:text-gp-red transition-colors"
                >
                  contacto@globalpro.cl
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gp-red flex-shrink-0" />
                <span className="text-gray-400">
                  Servicio a domicilio en todo Santiago
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} GlobalPro Taller Mecánico. Todos los derechos reservados.
            </p>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-gp-red rounded-lg flex items-center justify-center hover:bg-gp-red-dark transition-colors"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Float - Yellow Button */}
      <a
        href="https://wa.me/56939026185"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-yellow-400 text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 animate-bounce"
      >
        <Phone className="w-8 h-8" />
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-30" />
      </a>
    </footer>
  );
}
