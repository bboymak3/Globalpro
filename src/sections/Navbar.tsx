import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, ChevronDown, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const comunas = [
  'Alhué', 'Buin', 'Calera de Tango', 'Cerrillos', 'Cerro Navia', 'Colina', 'Conchalí',
  'Curacaví', 'El Bosque', 'El Monte', 'Estación Central', 'Huechuraba', 'Independencia',
  'Isla de Maipo', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina',
  'Las Condes', 'Lampa', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú',
  'María Pinto', 'Melipilla', 'Ñuñoa', 'Padre Hurtado', 'Paine', 'Pedro Aguirre Cerda',
  'Peñaflor', 'Peñalolén', 'Pirque', 'Providencia', 'Pudahuel', 'Puente Alto', 'Quilicura',
  'Quinta Normal', 'Recoleta', 'Renca', 'San Bernardo', 'San Joaquín', 'San José de Maipo',
  'San Miguel', 'San Pedro', 'San Ramón', 'Santiago', 'Talagante', 'Tiltil', 'Vitacura'
];

const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Soluciones', href: '#soluciones' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Galería', href: '#galeria' },
  { name: 'Marcas', href: '#marcas' },
  { name: 'A Domicilio', href: '#domicilio' },
  { name: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gp-dark/95 backdrop-blur-md shadow-lg border-b-2 border-gp-red'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); scrollToSection('#inicio'); }}
            className="flex items-center gap-3 group"
          >
            <div className="bg-gp-blue p-2 rounded-lg shadow-lg group-hover:scale-105 transition-transform">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-xl tracking-wide">GLOBALPRO</div>
              <div className="text-gray-400 text-xs">Taller Mecánico</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 2).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-gray-300 hover:text-gp-red px-4 py-2 rounded-lg transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            
            {/* Comunas Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-300 hover:text-gp-red px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-1">
                  Comunas <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-80 overflow-y-auto w-56 bg-gp-dark border-gp-red/30">
                {comunas.map((comuna) => (
                  <DropdownMenuItem
                    key={comuna}
                    onClick={() => scrollToSection('#contacto')}
                    className="text-gray-300 hover:text-gp-red hover:bg-gp-red/10 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {comuna}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(2).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-gray-300 hover:text-gp-red px-4 py-2 rounded-lg transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => window.open('https://wa.me/56939026185', '_blank')}
              className="bg-gp-red hover:bg-gp-red-dark text-white rounded-full px-6 shadow-gp hover:shadow-gp-lg transition-all"
            >
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gp-dark/98 backdrop-blur-md border-t border-gp-red/30">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="block text-gray-300 hover:text-gp-red py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-2 px-4">Comunas de Santiago:</p>
              <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
                {comunas.slice(0, 20).map((comuna) => (
                  <button
                    key={comuna}
                    onClick={() => scrollToSection('#contacto')}
                    className="text-left text-gray-400 hover:text-gp-red text-sm py-1 px-4"
                  >
                    {comuna}
                  </button>
                ))}
              </div>
            </div>
            <Button
              onClick={() => window.open('https://wa.me/56939026185', '_blank')}
              className="w-full bg-gp-red hover:bg-gp-red-dark text-white rounded-full mt-4"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contactar por WhatsApp
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
