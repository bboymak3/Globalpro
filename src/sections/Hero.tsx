import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wrench, 
  Calendar, 
  Phone, 
  Shield, 
  Clock, 
  MapPin,
  Car,
  Settings
} from 'lucide-react';

const stats = [
  { value: '+1000', label: 'Autos Reparados', icon: Car },
  { value: '+15', label: 'Años Experiencia', icon: Clock },
  { value: '100%', label: 'Garantía', icon: Shield },
];

const keywords = [
  'taller mecánico',
  'taller automotriz',
  'mecánica automotriz',
  'servicio automotriz',
  'mecánico a domicilio'
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-on-scroll opacity-0">
              <Badge className="bg-gp-red hover:bg-gp-red text-white px-4 py-2 text-sm font-semibold mb-4">
                <Settings className="w-4 h-4 mr-2" />
                Servicio Automotriz Integral
              </Badge>
            </div>

            <h1 className="animate-on-scroll opacity-0 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="text-gp-red">Mecánico a Domicilio</span>
            </h1>

            <h2 className="animate-on-scroll opacity-0 text-3xl sm:text-4xl font-bold text-white leading-tight">
              Taller Mecánico Especialista en <span className="text-gp-red">Diagnóstico y Reparación</span>
            </h2>

            <p className="animate-on-scroll opacity-0 text-lg text-gray-300 leading-relaxed">
              En <strong className="text-white">GlobalPro</strong>, somos expertos en{' '}
              <span className="text-gp-red">mecánica automotriz</span>,{' '}
              <span className="text-gp-red">electromecánica de vehículos</span> y{' '}
              <span className="text-gp-red">mantenimiento preventivo</span>. 
              Ofrecemos servicio a domicilio en todo Santiago. ¡Tu vehículo en las mejores manos!
            </p>

            {/* Keywords Tags */}
            <div className="animate-on-scroll opacity-0 flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full border border-white/20"
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="animate-on-scroll opacity-0 grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
                >
                  <stat.icon className="w-6 h-6 text-gp-red mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="animate-on-scroll opacity-0 flex flex-wrap gap-4">
              <Button
                onClick={() => {
                  const el = document.querySelector('#contacto');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gp-red hover:bg-gp-red-dark text-white rounded-full px-8 py-6 text-lg font-semibold shadow-gp hover:shadow-gp-lg transition-all"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Cita
              </Button>
              <Button
                onClick={() => {
                  const el = document.querySelector('#servicios');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gp-dark rounded-full px-8 py-6 text-lg font-semibold"
              >
                <Wrench className="w-5 h-5 mr-2" />
                Ver Servicios
              </Button>
            </div>
          </div>

          {/* Right Column - Image Card */}
          <div className="animate-on-scroll opacity-0 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gp-red/20 rounded-3xl blur-2xl" />
              <img
                src="/images/mecanico-a-domicilio-en-santiago.png"
                alt="Mecánico profesional GlobalPro"
                className="relative rounded-2xl shadow-2xl border-4 border-gp-red/30 w-full object-cover h-[500px]"
              />
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="bg-gp-red p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Servicio a Domicilio</p>
                    <p className="text-sm text-gray-500">Toda la RM</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-gp-red rounded-xl p-4 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-white" />
                  <div>
                    <p className="font-bold text-white">+56 9 3902 6185</p>
                    <p className="text-sm text-white/80">Disponible 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
