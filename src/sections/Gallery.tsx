import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: '/images/accidentado-en-la-via-barado-el-carro-no-prende-mecanico-en-la-via-a-domicilio-en-santiago.png',
    title: 'Auxilio en Ruta 24/7',
    description: 'Servicio de emergencia para vehículos accidentados o varados'
  },
  {
    src: '/images/mecanico-a-domicilio-emergencias-mecanico-frenos-santiago.jpg',
    title: 'Mecánico a Domicilio',
    description: 'Servicio de emergencias y reparación de frenos en Santiago'
  },
  {
    src: '/images/carroceria-pintura-reparacion.jpeg',
    title: 'Carrocería y Pintura',
    description: 'Reparación profesional de carrocería y pintura automotriz'
  },
  {
    src: '/images/image1.jpg',
    title: 'Taller Mecánico',
    description: 'Instalaciones equipadas con tecnología de punta'
  },
  {
    src: '/images/image2.png',
    title: 'Diagnóstico Avanzado',
    description: 'Equipos de diagnóstico computarizado'
  },
  {
    src: '/images/mantenimiento-vehicular-general.jpeg',
    title: 'Mantenimiento General',
    description: 'Servicio completo de mantenimiento preventivo'
  },
  {
    src: '/images/plan-mantenimiento-preventivo.jpeg',
    title: 'Plan de Mantenimiento',
    description: 'Programas personalizados de mantenimiento preventivo'
  },
  {
    src: '/images/reparacion-aire-acondicionado.jpeg',
    title: 'Aire Acondicionado',
    description: 'Reparación y recarga de sistemas de climatización'
  },
  {
    src: '/images/reparacion-frenos-domicilio.jpeg',
    title: 'Reparación de Frenos',
    description: 'Cambio de pastillas y discos a domicilio'
  },
  {
    src: '/images/reparacion-inyeccion-electronica.jpeg',
    title: 'Inyección Electrónica',
    description: 'Diagnóstico y reparación de sistemas de inyección'
  },
  {
    src: '/images/reparacion-motor-automotriz.jpeg',
    title: 'Reparación de Motor',
    description: 'Reconstrucción y reparación de motores'
  },
  {
    src: '/images/reparacion-sistema-electrico.jpeg',
    title: 'Sistema Eléctrico',
    description: 'Reparación de fallas eléctricas y electrónica'
  },
  {
    src: '/images/reparacion-transmision-embrague.jpeg',
    title: 'Transmisión y Embrague',
    description: 'Reparación de cajas de cambio y embragues'
  },
  {
    src: '/images/suspension-direccion-reparacion.jpeg',
    title: 'Suspensión y Dirección',
    description: 'Reparación de amortiguadores y sistemas de dirección'
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
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

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="galeria" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <Badge className="bg-gp-red/10 text-gp-red hover:bg-gp-red/20 mb-4">
            <Camera className="w-4 h-4 mr-2" />
            Nuestro Trabajo
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Galería de <span className="text-gp-red">Trabajos Realizados</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce la calidad de nuestro trabajo. Haz clic en cualquier imagen para verla en tamaño completo.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-on-scroll opacity-0">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm">{image.title}</h3>
                  <p className="text-white/70 text-xs">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div 
            className="max-w-5xl max-h-[80vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-bold">{galleryImages[selectedImage].title}</h3>
              <p className="text-white/70">{galleryImages[selectedImage].description}</p>
              <p className="text-white/50 text-sm mt-2">
                {selectedImage + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
