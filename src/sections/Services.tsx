import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wrench, 
  Zap, 
  Snowflake, 
  Disc, 
  Cog, 
  Paintbrush,
  Thermometer,
  Settings,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Mecánica General y Mantenimiento',
    description: 'Servicio completo de mantenimiento preventivo automotriz, engrase general, cambio de aceite y revisión técnica periódica.',
    keywords: ['mantenimiento de vehículos', 'mantenimiento automotriz', 'mantenimiento preventivo', 'engrase general automovil', 'revisión técnica'],
    features: ['Cambio de aceite y filtros', 'Revisión de 50 puntos', 'Afinamiento de motor', 'Diagnóstico computarizado'],
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80'
  },
  {
    icon: Zap,
    title: 'Electromecánica y Electricidad',
    description: 'Especialistas en electricidad automotriz, reparación de ECU, sistema eléctrico del vehículo y diagnóstico de fallas eléctricas.',
    keywords: ['electromecánica de vehículos', 'electricidad automotriz', 'reparación eléctrica de autos', 'electrónica automotriz'],
    features: ['Diagnóstico de batería', 'Reparación de alternador', 'Sistema de arranque', 'Cableado automotriz'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
  },
  {
    icon: Snowflake,
    title: 'Aire Acondicionado y Calefacción',
    description: 'Expertos en reparación de aire acondicionado automotriz, mantenimiento de climatización, compresor y radiador de calefacción.',
    keywords: ['reparación de aire acondicionado auto', 'mantenimiento de aire acondicionado auto', 'reparación de calefacción de autos'],
    features: ['Recarga de gas refrigerante', 'Detección de fugas', 'Reparación de compresor', 'Limpieza de conductos'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80'
  },
  {
    icon: Disc,
    title: 'Frenos y Suspensión',
    description: 'Reparación de frenos ABS, cambio de pastillas y discos, suspensión automotriz, amortiguadores y dirección hidráulica.',
    keywords: ['reparación de frenos', 'reparación de suspensión automotriz', 'reparación de amortiguadores', 'reparación de dirección'],
    features: ['Frenos ABS y ESP', 'Amortiguadores', 'Dirección asistida', 'Alineación y balanceo'],
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80'
  },
  {
    icon: Cog,
    title: 'Transmisión y Embrague',
    description: 'Reparación de transmisiones manuales y automáticas, embrague, caja de transferencia y diferencial.',
    keywords: ['reparación de transmisiones', 'embrague de auto', 'caja de cambios', 'transmisión automática'],
    features: ['Transmisión manual/automática', 'Cambio de embrague', 'Reparación de caja', 'Diferencial'],
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80'
  },
  {
    icon: Paintbrush,
    title: 'Chapa y Pintura Automotriz',
    description: 'Reparación de carrocería, chapa y pintura, enderezado, tratamiento anticorrosivo y pulido de pintura.',
    keywords: ['reparación de chapa y pintura', 'reparación de carrocería', 'taller de pintura automotriz'],
    features: ['Enderezado de chasis', 'Pintura con horno', 'Coincidencia de color', 'Tratamiento anticorrosivo'],
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80'
  },
  {
    icon: Thermometer,
    title: 'Sistema de Refrigeración',
    description: 'Reparación de radiadores, bomba de agua, termostato, mangueras y sistema de refrigeración del motor.',
    keywords: ['reparación de radiadores de autos', 'bomba de agua de auto', 'sistema de refrigeración del vehículo'],
    features: ['Reparación de radiador', 'Bomba de agua', 'Termostato', 'Limpieza del sistema'],
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80'
  },
  {
    icon: Settings,
    title: 'Turbos y Escape',
    description: 'Reparación de turbos, sistema de escape, catalizador, silenciador y filtros de partículas.',
    keywords: ['reparación de turbos', 'reparación de escapes de autos', 'catalizador de auto'],
    features: ['Reparación de turbo', 'Catalizador', 'Silenciador', 'Filtro de partículas'],
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80'
  }
];

const additionalServices = [
  'reparación de tapicería de autos',
  'reparación de interiores de autos',
  'reparación de llantas de autos',
  'reparación de elevadores eléctricos de autos',
  'reparación de sistemas de gas (GNV/GLP)',
  'reparación de computadora/ECU de autos',
  'reparación de sistemas híbridos y eléctricos',
  'mantenimiento correctivo',
  'mantenimiento predictivo',
  'diagnóstico avanzado de fallas automotrices'
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);
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
    <section id="servicios" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <Badge className="bg-gp-red/10 text-gp-red hover:bg-gp-red/20 mb-4">
            <Settings className="w-4 h-4 mr-2" />
            Nuestros Servicios
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Servicios de <span className="text-gp-red">Mecánica Automotriz</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Solución completa para el mantenimiento y reparación de tu vehículo. 
            Taller mecánico especializado con tecnología de diagnóstico avanzada.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left - Service Cards */}
          <div className="space-y-4 animate-on-scroll opacity-0">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activeService === index 
                    ? 'border-gp-red shadow-gp bg-gp-red/5' 
                    : 'border-gray-200 hover:border-gp-red/50'
                }`}
                onClick={() => setActiveService(index)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    activeService === index ? 'bg-gp-red' : 'bg-gray-100'
                  }`}>
                    <service.icon className={`w-6 h-6 ${
                      activeService === index ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    activeService === index ? 'text-gp-red rotate-90' : 'text-gray-400'
                  }`} />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right - Active Service Detail */}
          <div className="animate-on-scroll opacity-0">
            <Card className="h-full border-gp-red/20 shadow-xl overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">
                    {services[activeService].title}
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  {services[activeService].description}
                </p>
                
                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {services[activeService].keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gp-red/10 text-gp-red text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {services[activeService].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gp-red" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => window.open(`https://wa.me/56939026185?text=Hola,%20quiero%20cotizar%20por%20${encodeURIComponent(services[activeService].title)}`, '_blank')}
                  className="w-full bg-gp-red hover:bg-gp-red-dark text-white"
                >
                  Cotizar Ahora
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Services */}
        <div className="animate-on-scroll opacity-0">
          <Card className="bg-gp-dark text-white border-0">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Servicios Adicionales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {additionalServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gp-red flex-shrink-0" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
