import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle,
  Wrench,
  Zap,
  Disc,
  AlertOctagon,
  Snowflake,
  Fan,
  Plug,
  Laptop,
  Settings,
  Car,
  Phone
} from 'lucide-react';

const soluciones = [
  {
    icon: Wrench,
    title: 'Auxilio Mecánico Inmediato: Mecánico a Domicilio 24/7',
    description: 'Si te quedaste varado, no desesperes. En Global Pro Automotriz entendemos que las fallas no tienen horario. Ofrecemos un servicio de mecánico a domicilio 24/7 especializado en rescatar conductores accidentados o con fallas súbitas en la vía. Ya sea un arreglo alternador a domicilio o un problema con la caja de cambio, nuestro mecánico 24 horas se desplaza hacia tu ubicación.',
    keywords: ['mecánico a domicilio 24/7', 'mecánico 24 horas', 'auxilio mecánico', 'carro taller mecánico'],
    image: '/images/mantenimiento-vehicular-general.jpeg',
    layout: 'left'
  },
  {
    icon: Zap,
    title: 'Mecánico Automotriz a Domicilio: Expertos en Fallas Eléctricas',
    description: '¿Tu vehículo no arranca? El servicio de mecánico automotriz a domicilio de Global Automotriz es líder en diagnósticos rápidos. Contamos con técnico mecánico automotriz capacitado para realizar escaner automotriz en terreno, identificando fallas en el motor auto o el sistema de inyección. Si necesitas un mecánico electricista de autos a domicilio para un arreglo de chapa de auto o una falla en las alarmas para autos, llegamos a Vitacura, Huechuraba y todo Santiago.',
    keywords: ['mecánico automotriz a domicilio', 'escaner automotriz', 'electricidad automotriz', 'alarmas auto santiago'],
    image: '/images/reparacion-sistema-electrico.jpeg',
    layout: 'right'
  },
  {
    icon: Disc,
    title: 'Especialistas en Frenos: Cambio de Pastillas y Reparación ABS',
    description: 'La seguridad es lo primero. Somos especialistas en frenos y ofrecemos la reparación de frenos día domingo para aquellos que no pueden esperar al lunes. Si notas ruidos extraños, nuestro servicio de cambio pastillas de freno a domicilio es la solución ideal. Trabajamos con frenos ABS, frenos caliper camión y realizamos la reparación caliper en el lugar.',
    keywords: ['reparación de frenos', 'cambio pastillas de freno', 'frenos ABS', 'frenos caliper camión'],
    image: '/images/reparacion-frenos-domicilio.jpeg',
    layout: 'left'
  },
  {
    icon: AlertOctagon,
    title: 'Suspensión y Amortiguadores: Suavidad y Control en tu Conducción',
    description: '¿Sientes cada bache en el camino? Es momento de revisar la suspensión y los amortiguadores. En Global Pro Automotriz, realizamos el cambio de amortiguadores a domicilio y contamos con especialistas en taller mecánico suspensión. Un mecánico especialista mecánico evaluará si necesitas un cambia de amortiguadores o una mantención en la dirección.',
    keywords: ['suspensión', 'amortiguadores', 'cambio de amortiguadores', 'taller mecánico suspensión'],
    image: '/images/suspension-direccion-reparacion.jpeg',
    layout: 'right'
  },
  {
    icon: Snowflake,
    title: 'Aire Acondicionado Automotriz: Recarga y Reparación a Domicilio',
    description: 'No sufras más por el calor. Si buscas un taller aire acondicionado automotriz cerca de mi, te ofrecemos algo mejor: aire acondicionado automotriz a domicilio. Realizamos la recarga aire acondicionado auto, detección de fugas y reparación aire acondicionado automotriz sin que muevas tu vehículo. Somos expertos en a/c auto y atendemos en Santiago.',
    keywords: ['aire acondicionado automotriz', 'recarga aire acondicionado', 'reparación aire acondicionado', 'a/c auto'],
    image: '/images/reparacion-aire-acondicionado.jpeg',
    layout: 'left'
  },
  {
    icon: Fan,
    title: 'Mantenimiento de Aire Acondicionado: Soluciones Rápidas para tu Auto',
    description: 'El sistema de aire acondicionado auto requiere cuidado constante. En Global Pro, somos el taller de aire acondicionado automotriz en Santiago que llega a tu hogar. Ofrecemos arreglo aire acondicionado auto, limpieza de filtros y carga de gas. Si tu aire acondicionado automotriz ha dejado de enfriar, nuestro mecánico automotriz lo solucionará rápidamente.',
    keywords: ['mantenimiento aire acondicionado', 'taller aire acondicionado', 'arreglo aire acondicionado', 'mantenimiento automotriz'],
    image: '/images/reparacion-aire-acondicionado.jpeg',
    layout: 'right'
  },
  {
    icon: Plug,
    title: 'Eléctrico Automotriz a Domicilio: Alarmas, Alternadores y Baterías',
    description: 'Los problemas eléctricos pueden ser un dolor de cabeza. Nuestro eléctrico automotriz a domicilio es especialista en diagnosticar cortes, fallas de arranque y sistemas de carga. Ofrecemos electricidad automotriz a domicilio 24/7 en toda la Región Metropolitana. Si necesitas la instalación de alarmas auto santiago o tienes problemas con tus alarmas automotriz, nuestro eléctrico de auto a domicilio tiene la solución.',
    keywords: ['eléctrico automotriz', 'alarmas auto santiago', 'alternadores', 'baterías', 'electricidad automotriz 24/7'],
    image: '/images/reparacion-sistema-electrico.jpeg',
    layout: 'left'
  },
  {
    icon: Laptop,
    title: 'Escáner y Diagnóstico Electrónico: Tecnología GP al Servicio de tu Motor',
    description: 'En la mecánica automotriz moderna, el escaner automotriz es indispensable. En Global Pro Automotriz, utilizamos tecnología de punta para leer los códigos de falla de tu motor automotriz. Como pro motor servicio automotriz, identificamos problemas en inyectores, bujías y sensores. Realizamos limpieza de inyectores y limpieza inyectores gasolina para mejorar el rendimiento de tu combustible.',
    keywords: ['escaner automotriz', 'diagnóstico electrónico', 'motor automotriz', 'limpieza de inyectores', 'inyectores gasolina'],
    image: '/images/mantenimiento-vehicular-general.jpeg',
    layout: 'right'
  },
  {
    icon: Settings,
    title: 'Mantenimiento Automotriz de Confianza: Cambio de Aceite y Afinamiento',
    description: 'Evita averías mayores con una buena mantención auto a domicilio. En Global Pro, realizamos el cambio de aceite, revisión de correas y cambio de bujías en la comodidad de tu estacionamiento. Nuestro servicio de mantenimiento automotriz es integral y profesional. Si te preguntas por un cambio de aceite auto cerca mio, nosotros vamos hacia ti.',
    keywords: ['mantenimiento automotriz', 'cambio de aceite', 'cambio de bujías', 'mantención auto', 'afinamiento'],
    image: '/images/plan-mantenimiento-preventivo.jpeg',
    layout: 'left'
  },
  {
    icon: Car,
    title: 'Taller Mecánico Chevrolet y Multimarca: Calidad Garantizada en GP',
    description: 'Si eres dueño de un Chevrolet Spark o cualquier modelo de la marca, somos tu taller mecánico chevrolet de referencia. Contamos con mecánico chevrolet a domicilio y especialistas en nissan y vw. Ofrecemos desde el cambio de embrague a domicilio hasta reparaciones de caja de cambio. Global Pro Automotriz es el taller automotriz que estabas buscando en la Región Metropolitana.',
    keywords: ['taller mecánico chevrolet', 'mecánico chevrolet', 'nissan', 'volkswagen', 'cambio de embrague', 'caja de cambio'],
    image: '/images/reparacion-transmision-embrague.jpeg',
    layout: 'right'
  }
];

export default function Soluciones() {
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
    <section id="soluciones" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Banner with Accident Image */}
        <div className="mb-16 animate-on-scroll opacity-0">
          <Card className="bg-gp-dark text-white border-0 shadow-gp-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-64 lg:h-auto">
                  <img
                    src="/images/accidentado-en-la-via-barado-el-carro-no-prende-mecanico-en-la-via-a-domicilio-en-santiago.png"
                    alt="Servicio de emergencia en ruta"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gp-dark/80 lg:bg-gradient-to-r" />
                </div>
                
                {/* Content Side */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-gp-red" />
                    <Badge className="bg-gp-red text-white">24/7</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Servicio de Emergencia en Ruta: Auxilio Mecánico para Conductores Varados y Accidentados
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Quedarse varado en medio de la carretera o sufrir un accidente inesperado es una de las situaciones más estresantes para cualquier conductor. En esos momentos críticos, no solo buscas un técnico, buscas una solución inmediata.
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    En <strong className="text-white">Global Pro Automotriz</strong>, hemos diseñado nuestra unidad de respuesta rápida para ofrecer <strong className="text-gp-red">auxilio mecánico de emergencia</strong> en toda la Región Metropolitana, operando bajo el concepto de <strong>mecánico de emergencia 24/7</strong>. Si tu vehículo se detuvo por una falla súbita en el motor, un corte de correas o un problema crítico en la caja de cambio, nuestro servicio de <strong>mecánico a domicilio 24 horas</strong> está listo para rescatarte sin que tengas que esperar horas por una grúa.
                  </p>
                  <Button
                    onClick={() => window.open('https://wa.me/56939026185?text=EMERGENCIA:%20Necesito%20auxilio%20mecánico', '_blank')}
                    className="bg-gp-red hover:bg-gp-red-dark text-white font-semibold"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Activar Protocolo de Emergencia
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <Badge className="bg-gp-red/10 text-gp-red hover:bg-gp-red/20 mb-4">
            <Wrench className="w-4 h-4 mr-2" />
            Nuestras Soluciones
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Soluciones <span className="text-gp-red">Automotrices Especializadas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expertos en mecánica a domicilio, desde fallas complejas hasta mantenimiento preventivo.
            Llevamos el taller hasta donde estés.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="space-y-8">
          {soluciones.map((solucion, index) => (
            <Card
              key={index}
              className="animate-on-scroll opacity-0 overflow-hidden border-gray-200 hover:border-gp-red/30 hover:shadow-lg transition-all"
            >
              <CardContent className="p-0">
                <div className={`grid lg:grid-cols-2 ${solucion.layout === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Text Content */}
                  <div className={`p-8 ${solucion.layout === 'right' ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gp-red/10 rounded-xl flex items-center justify-center">
                        <solucion.icon className="w-6 h-6 text-gp-red" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{solucion.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {solucion.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {solucion.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gp-red/10 text-gp-red text-sm rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className={`hidden lg:block relative h-64 lg:h-auto ${solucion.layout === 'right' ? 'lg:order-1' : ''}`}>
                    <img
                      src={solucion.image}
                      alt={solucion.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
