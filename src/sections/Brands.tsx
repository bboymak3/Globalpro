import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Truck, Settings, CheckCircle2 } from 'lucide-react';

const carBrands = [
  { name: 'Volkswagen', specialized: true },
  { name: 'Ford', specialized: true },
  { name: 'Mercedes Benz', specialized: true },
  { name: 'BMW', specialized: true },
  { name: 'Chevrolet', specialized: true },
  { name: 'Nissan', specialized: true },
  { name: 'Renault', specialized: true },
  { name: 'Toyota', specialized: false },
  { name: 'Hyundai', specialized: false },
  { name: 'Kia', specialized: false },
  { name: 'Peugeot', specialized: false },
  { name: 'Citroën', specialized: false },
];

const vehicleTypes = [
  {
    icon: Car,
    title: 'Vehículos Livianos',
    description: 'Automóviles, camionetas, SUVs, pickups',
    examples: ['Sedan', 'Hatchback', 'SUV', 'Pickup', 'Camioneta']
  },
  {
    icon: Truck,
    title: 'Vehículos Pesados',
    description: 'Camiones, tractocamiones, maquinaria pesada',
    examples: ['Camión de carga', 'Camión volquete', 'Camión mixer', 'Tractocamión']
  },
  {
    icon: Settings,
    title: 'Vehículos Especiales',
    description: 'Híbridos, eléctricos, clásicos, diésel',
    examples: ['Vehículos híbridos', 'Vehículos eléctricos', 'Autos clásicos', 'Diésel']
  }
];

const dieselServices = [
  'taller diesel',
  'mecánico diesel',
  'mecánica diesel',
  'mantenimiento de tractocamiones',
  'mecánica de maquinaria pesada'
];

export default function Brands() {
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
    <section id="marcas" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <Badge className="bg-gp-red/10 text-gp-red hover:bg-gp-red/20 mb-4">
            <Car className="w-4 h-4 mr-2" />
            Marcas y Vehículos
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Taller <span className="text-gp-red">Multimarca</span> Especializado
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Atendemos todas las marcas de vehículos con técnicos especializados certificados. 
            Desde autos particulares hasta flotas vehiculares y vehículos pesados.
          </p>
        </div>

        {/* Vehicle Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 animate-on-scroll opacity-0">
          {vehicleTypes.map((type, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-gp-red/30">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gp-red/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gp-red group-hover:scale-110 transition-all">
                  <type.icon className="w-7 h-7 text-gp-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Brands Grid */}
        <div className="animate-on-scroll opacity-0">
          <Card className="bg-gray-50 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Marcas que Atendemos
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {carBrands.map((brand, index) => (
                  <div
                    key={index}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                      brand.specialized
                        ? 'bg-white border-gp-red/30 hover:border-gp-red'
                        : 'bg-white border-gray-200 hover:border-gp-red/50'
                    }`}
                  >
                    {brand.specialized && (
                      <div className="absolute -top-2 -right-2 bg-gp-red text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Especializado
                      </div>
                    )}
                    <div className="text-center">
                      <Car className="w-8 h-8 text-gp-red mx-auto mb-2" />
                      <p className="font-semibold text-gray-900 text-sm">{brand.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Diesel Services */}
        <div className="mt-12 animate-on-scroll opacity-0">
          <Card className="bg-gp-dark text-white border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gp-red/20 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Truck className="w-8 h-8 text-gp-red" />
                    Servicio Diesel y Vehículos Pesados
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Contamos con mecánicos especializados en vehículos diésel, camiones y maquinaria pesada. 
                    Servicio completo para mantenimiento de flotas vehiculares.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dieselServices.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/10 text-white text-sm rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-gp-red mb-1">24/7</div>
                    <div className="text-sm text-gray-300">Servicio de Emergencia</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-gp-red mb-1">+500</div>
                    <div className="text-sm text-gray-300">Camiones Atendidos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
