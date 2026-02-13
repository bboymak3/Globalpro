import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Calendar
} from 'lucide-react';

const services = [
  'Mecánica General',
  'Electricidad Automotriz',
  'Aire Acondicionado',
  'Frenos y Suspensión',
  'Transmisión',
  'Chapa y Pintura',
  'Diagnóstico Computarizado',
  'Servicio a Domicilio',
  'Emergencia 24/7'
];

const comunas = [
  'Santiago', 'Providencia', 'Las Condes', 'Vitacura', 'Lo Barnechea',
  'Ñuñoa', 'La Reina', 'Peñalolén', 'La Florida', 'Puente Alto',
  'Maipú', 'Pudahuel', 'Quilicura', 'Renca', 'Independencia',
  'San Miguel', 'La Cisterna', 'El Bosque', 'San Bernardo', 'Padre Hurtado',
  'Otra comuna'
];

const contactInfo = [
  {
    icon: Phone,
    title: 'Teléfono',
    value: '+56 9 3902 6185',
    link: 'tel:+56939026185',
    description: 'Disponible 24/7 para emergencias'
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contacto@globalpro.cl',
    link: 'mailto:contacto@globalpro.cl',
    description: 'Respuesta en menos de 24 horas'
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    value: 'Servicio a Domicilio RM',
    link: '#domicilio',
    description: 'Cobertura en toda Santiago'
  },
  {
    icon: Clock,
    title: 'Horario',
    value: 'Lun - Vie: 9:00 - 18:00',
    link: null,
    description: 'Emergencias: 24 horas'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    vehiculo: '',
    servicio: '',
    comuna: '',
    mensaje: ''
  });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola GlobalPro, soy *${formData.nombre}*.%0A📞 ${formData.telefono}%0A🚗 ${formData.vehiculo}%0A📍 ${formData.comuna}%0A🔧 ${formData.servicio}%0A📝 ${formData.mensaje}`;
    window.open(`https://wa.me/56939026185?text=${text}`, '_blank');
  };

  return (
    <section id="contacto" ref={sectionRef} className="py-24 bg-gp-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <Badge className="bg-gp-red/20 text-gp-red hover:bg-gp-red/30 mb-4">
            <MessageCircle className="w-4 h-4 mr-2" />
            Contacto
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Agenda tu <span className="text-gp-red">Cita</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Contáctanos para agendar tu mantenimiento o cotización. 
            Estamos listos para atender tu vehículo.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4 animate-on-scroll opacity-0">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gp-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-gp-red" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.title}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-white font-semibold hover:text-gp-red transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white font-semibold">{info.value}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-1">{info.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* WhatsApp CTA */}
            <Card className="bg-gp-red border-0">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-10 h-10 text-white mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">
                  ¿Prefieres WhatsApp?
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Escríbenos directamente para una respuesta más rápida
                </p>
                <Button
                  onClick={() => window.open('https://wa.me/56939026185', '_blank')}
                  className="bg-white text-gp-red hover:bg-gray-100 w-full"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Abrir WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 animate-on-scroll opacity-0">
            <Card className="bg-white border-0">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-gp-red" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Solicita tu Cotización
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo</Label>
                      <Input
                        id="nombre"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder="+56 9 XXXX XXXX"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehiculo">Vehículo</Label>
                    <Input
                      id="vehiculo"
                      placeholder="Marca / Modelo / Año"
                      value={formData.vehiculo}
                      onChange={(e) => setFormData({ ...formData, vehiculo: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="servicio">Servicio requerido</Label>
                      <Select
                        value={formData.servicio}
                        onValueChange={(value) => setFormData({ ...formData, servicio: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comuna">Comuna</Label>
                      <Select
                        value={formData.comuna}
                        onValueChange={(value) => setFormData({ ...formData, comuna: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu comuna" />
                        </SelectTrigger>
                        <SelectContent>
                          {comunas.map((comuna) => (
                            <SelectItem key={comuna} value={comuna}>
                              {comuna}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">Mensaje (opcional)</Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Describe el problema de tu vehículo..."
                      rows={4}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gp-red hover:bg-gp-red-dark text-white py-6"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar por WhatsApp
                  </Button>

                  <p className="text-center text-gray-500 text-sm">
                    Al enviar, serás redirigido a WhatsApp con tu solicitud
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
