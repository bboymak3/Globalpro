import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Phone, 
  MapPin, 
  Wrench, 
  Zap, 
  Snowflake, 
  Disc,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const homeServices = [
  {
    icon: Wrench,
    title: 'Mecánico a Domicilio',
    description: 'Servicio mecánico a domicilio para mantenimiento y reparaciones generales',
    keywords: ['mecánico a domicilio', 'servicio mecánico a domicilio', 'mecánico automotriz a domicilio']
  },
  {
    icon: Zap,
    title: 'Electricidad a Domicilio',
    description: 'Especialistas en electricidad automotriz y electromecánica en tu ubicación',
    keywords: ['mecánico eléctrico a domicilio', 'servicio eléctrico automotriz a domicilio', 'reparación de autos a domicilio']
  },
  {
    icon: Snowflake,
    title: 'Aire Acondicionado',
    description: 'Recarga y reparación de aire acondicionado automotriz a domicilio',
    keywords: ['aire acondicionado automotriz a domicilio', 'mantenimiento de aire acondicionado auto']
  },
  {
    icon: Disc,
    title: 'Frenos y Suspensión',
    description: 'Cambio de pastillas, discos y amortiguadores en tu domicilio',
    keywords: ['cambio pastillas de freno a domicilio', 'cambio de amortiguadores a domicilio']
  }
];

const emergencyServices = [
  'Mecánico 24 horas',
  'Auxilio mecánico en ruta',
  'Diagnóstico de emergencia',
  'Arranque de batería',
  'Cambio de neumático',
  'Suministro de combustible'
];

const coverageAreas = [
  'Santiago Centro', 'Providencia', 'Las Condes', 'Vitacura', 'Lo Barnechea',
  'Ñuñoa', 'La Reina', 'Peñalolén', 'La Florida', 'Puente Alto',
  'Maipú', 'Pudahuel', 'Quilicura', 'Renca', 'Independencia',
  'San Miguel', 'La Cisterna', 'El Bosque', 'San Bernardo', 'Padre Hurtado'
];

export default function HomeService() {
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
    <section id="domicilio" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <Badge className="bg-gp-red/10 text-gp-red hover:bg-gp-red/20 mb-4">
            <Home className="w-4 h-4 mr-2" />
            Servicio a Domicilio
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mecánico a <span className="text-gp-red">Domicilio</span> en Santiago
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿No puedes mover tu vehículo? Nosotros vamos hasta donde estés. 
            Servicio de mecánica automotriz a domicilio en toda el Área Metropolitana.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="mb-16 animate-on-scroll opacity-0">
          <Card className="bg-gradient-to-r from-gp-red to-gp-red-dark text-white border-0 shadow-gp-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8" />
                    <h3 className="text-2xl font-bold">Servicio de Emergencia 24/7</h3>
                  </div>
                  <p className="text-white/90 mb-6">
                    Quedarse varado en la carretera es estresante. Nuestra unidad de respuesta rápida 
                    ofrece auxilio mecánico de emergencia en toda la Región Metropolitana.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {emergencyServices.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <Button
                    onClick={() => window.open('https://wa.me/56939026185?text=EMERGENCIA:%20Necesito%20auxilio%20mecánico', '_blank')}
                    className="bg-white text-gp-red hover:bg-gray-100 font-semibold"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Activar Emergencia
                  </Button>
                </div>
                <div className="hidden md:block">
                  <img
                    src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80"
                    alt="Servicio de emergencia"
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Home Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-on-scroll opacity-0">
          {homeServices.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-gp-red/30 h-full"
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gp-red/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gp-red group-hover:scale-110 transition-all">
                  <service.icon className="w-7 h-7 text-gp-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-1">
                  {service.keywords.slice(0, 2).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-gp-red/10 text-gp-red text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coverage Areas */}
        <div className="animate-on-scroll opacity-0">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-gp-red" />
                <h3 className="text-xl font-bold text-gray-900">
                  Cobertura en Santiago
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Atendemos en todas las comunas del Área Metropolitana de Santiago. 
                Consulta por tu zona específica.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {coverageAreas.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gp-red flex-shrink-0" />
                    <span className="text-sm text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm mb-4">
                  ¿No encuentras tu comuna? Contáctanos para verificar cobertura.
                </p>
                <Button
                  onClick={() => window.open('https://wa.me/56939026185?text=Hola,%20consulto%20por%20servicio%20a%20domicilio', '_blank')}
                  variant="outline"
                  className="border-gp-red text-gp-red hover:bg-gp-red hover:text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Consultar Cobertura
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mt-16 animate-on-scroll opacity-0">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            ¿Cómo Funciona el Servicio a Domicilio?
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Contacto',
                description: 'Llámanos o escríbenos por WhatsApp con tu ubicación y problema'
              },
              {
                step: '2',
                title: 'Diagnóstico',
                description: 'Evaluamos tu caso y te damos un presupuesto estimado'
              },
              {
                step: '3',
                title: 'Despacho',
                description: 'Enviamos un mecánico especializado a tu ubicación'
              },
              {
                step: '4',
                title: 'Reparación',
                description: 'Realizamos el servicio en el lugar con garantía incluida'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gp-red text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
