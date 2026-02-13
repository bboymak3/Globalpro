import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function Tapizado() {
  return (
    <section id="tapizado" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-2 border-green-600 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 md:h-auto">
                <img
                  src="https://tapizadodevolantes.pages.dev/images/forrar-un-volante-con-cuero-forrar-volante-coche-en-santiago-monocromatico.jpg"
                  alt="Tapizado de Volantes en Santiago"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
              </div>
              
              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">
                  Tapizado de <span className="text-green-600">Volantes</span> en Santiago
                </h2>
                <p className="text-gray-600 mb-6">
                  Si quieres información para el tapizado de volantes en Santiago a domicilio, 
                  entra al siguiente enlace. Servicio profesional de forrado de volantes con cuero 
                  y materiales de alta calidad.
                </p>
                <Button
                  onClick={() => window.open('https://tapizadodevolantes.pages.dev', '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  IR AL SITIO WEB
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
