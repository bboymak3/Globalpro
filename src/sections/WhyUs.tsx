import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Award, 
  Clock, 
  Users, 
  Wrench, 
  ThumbsUp,
  Star,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Profesionalismo',
    description: 'Técnicos certificados con años de experiencia en mecánica automotriz'
  },
  {
    icon: Wrench,
    title: 'Tecnología Avanzada',
    description: 'Equipos de diagnóstico computarizado y scanners de última generación'
  },
  {
    icon: Clock,
    title: 'Servicio Rápido',
    description: 'Tiempos de reparación optimizados sin comprometer la calidad'
  },
  {
    icon: Shield,
    title: 'Garantía Real',
    description: 'Todas nuestras reparaciones cuentan con garantía por escrito'
  },
  {
    icon: Users,
    title: 'Atención Personalizada',
    description: 'Explicamos cada reparación y mantenemos comunicación constante'
  },
  {
    icon: ThumbsUp,
    title: 'Precios Justos',
    description: 'Cotizaciones transparentes sin costos ocultos ni sorpresas'
  }
];

const stats = [
  { value: '+15', label: 'Años de Experiencia', icon: Clock },
  { value: '+1000', label: 'Clientes Satisfechos', icon: Users },
  { value: '+5000', label: 'Reparaciones', icon: Wrench },
  { value: '100%', label: 'Garantía', icon: Shield }
];

const certifications = [
  'Técnicos certificados',
  'Herramientas especializadas',
  'Repuestos originales',
  'Diagnóstico computarizado',
  'Atención 24/7',
  'Servicio a domicilio'
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <Badge className="bg-gp-red/10 text-gp-red hover:bg-gp-red/20 mb-4">
            <Star className="w-4 h-4 mr-2" />
            ¿Por Qué Elegirnos?
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tu Vehículo en las <span className="text-gp-red">Mejores Manos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Somos tu aliado de confianza en el cuidado de tu vehículo. 
            Combinamos experiencia, tecnología y compromiso para brindarte el mejor servicio.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-on-scroll opacity-0">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gp-dark text-white border-0">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-gp-red mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-on-scroll opacity-0">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-gp-red/30"
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gp-red/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gp-red group-hover:scale-110 transition-all">
                  <feature.icon className="w-7 h-7 text-gp-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications & Image */}
        <div className="grid lg:grid-cols-2 gap-8 animate-on-scroll opacity-0">
          <div>
            <Card className="h-full bg-gray-50 border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Nuestras Certificaciones
                </h3>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-gp-red flex-shrink-0" />
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gp-red/10 rounded-3xl blur-xl" />
            <img
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80"
              alt="Taller mecánico profesional"
              className="relative rounded-2xl shadow-xl w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gp-red rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Calidad Garantizada</p>
                  <p className="text-sm text-gray-600">ISO 9001 Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
