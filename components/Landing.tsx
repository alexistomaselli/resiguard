
import React from 'react';
import { 
  Shield, Building2, Users2, Zap, ArrowRight, Check, Star, 
  PlayCircle, Lock, Globe, MessageCircle, Wallet, 
  BarChart3, Smartphone, Headphones, HelpCircle
} from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center px-6 md:px-12 justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Shield size={24} />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">ResiGuard</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Funcionalidades</a>
          <a href="#whatsapp" className="hover:text-indigo-600 transition-colors">WhatsApp</a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">Precios</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-bold text-slate-600 hover:text-indigo-600">Log In</button>
          <button 
            onClick={onStart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
          >
            Acceso Sistema <ArrowRight size={18} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100">
            <MessageCircle size={14} className="animate-bounce" /> Ahora con Integración Nativa de WhatsApp
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 max-w-4xl tracking-tight">
            La administración de tu edificio, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">en piloto automático.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed">
            ResiGuard es el PMS diseñado para administradores modernos. Gestiona cobros, mantenimientos con IA y la felicidad de tus residentes desde un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <button 
              onClick={onStart}
              className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-2xl shadow-indigo-300 transition-all transform hover:-translate-y-1"
            >
              Probar Demo Gratis
            </button>
            <button className="px-10 py-5 bg-white text-slate-700 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <PlayCircle size={22} /> Ver Cómo Funciona
            </button>
          </div>

          <div className="relative w-full max-w-6xl">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400/20 blur-3xl rounded-full"></div>
            <div className="bg-white rounded-3xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000" 
                alt="Dashboard ResiGuard" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section id="whatsapp" className="py-24 px-6 md:px-12 bg-emerald-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-200">
              <MessageCircle size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Tus residentes aman usar <span className="text-emerald-600">WhatsApp.</span> Nosotros también.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Elimina la fricción de descargar otra aplicación. Con nuestro bot inteligente, los residentes pueden realizar gestiones críticas en segundos:
            </p>
            <ul className="space-y-4">
              {[
                'Reportar averías enviando una foto o video.',
                'Solicitar estados de cuenta y links de pago.',
                'Reservar el quincho o salón de eventos.',
                'Recibir notificaciones de seguridad y visitas.'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                  <div className="bg-emerald-100 text-emerald-600 p-1 rounded-full"><Check size={16} /></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl border border-emerald-100 max-w-sm mx-auto relative z-10">
               <div className="bg-slate-100 rounded-[2rem] h-[600px] overflow-hidden flex flex-col">
                  <div className="bg-emerald-600 p-4 text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">RG</div>
                    <div>
                      <p className="text-sm font-bold">Asistente ResiGuard</p>
                      <p className="text-[10px] opacity-80">En línea</p>
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-4 bg-[#e5ddd5]">
                    <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-[80%] text-sm shadow-sm">
                      ¡Hola Sofia! Detectamos que eres de la Unidad 101. ¿En qué puedo ayudarte hoy?
                    </div>
                    <div className="bg-[#dcf8c6] p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto text-sm shadow-sm">
                      Hola, se rompió el grifo de la cocina. Te envío una foto.
                    </div>
                    <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-[80%] text-sm shadow-sm italic text-slate-400">
                      [Imagen de grifo goteando]
                    </div>
                    <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-[80%] text-sm shadow-sm">
                      Recibido. Nuestra IA ha clasificado esto como <b>Prioridad Media (Plomería)</b>. He creado el ticket #452 para ti.
                    </div>
                  </div>
               </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-400/20 blur-2xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Financial Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <Wallet className="text-indigo-600 mb-4" size={32} />
                  <h4 className="font-bold text-slate-900 mb-2">Cobros Inteligentes</h4>
                  <p className="text-sm text-slate-500 font-medium">Lógica automática: si hay inquilino paga él, si no, paga el dueño.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8">
                  <BarChart3 className="text-blue-600 mb-4" size={32} />
                  <h4 className="font-bold text-slate-900 mb-2">Transparencia</h4>
                  <p className="text-sm text-slate-500 font-medium">Dashboard financiero para dueños con reportes de ROI y ocupación.</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
               <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Finanzas</h2>
               <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Cuentas claras, <br/><span className="text-indigo-600">dueños tranquilos.</span></h3>
               <p className="text-lg text-slate-600 leading-relaxed mb-8">
                 Automatizamos la facturación de expensas basándonos en el estado de cada unidad. Nuestra plataforma se encarga de las notificaciones de deuda y recordatorios de pago para mantener la morosidad al mínimo.
               </p>
               <div className="flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-900">15%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Menos Morosidad</span>
                  </div>
                  <div className="w-px h-12 bg-slate-200"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-900">100%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Automatizado</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Soluciones</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900">Todo lo que necesitas para escalar.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Gestión SaaS Multicondominio',
              desc: 'Controla cientos de edificios desde un único panel centralizado con permisos granulares.',
              icon: Building2,
              color: 'bg-blue-600'
            },
            {
              title: 'IA para Mantenimiento',
              desc: 'Nuestro motor Gemini analiza fallas, prioriza urgencias y sugiere acciones inmediatas.',
              icon: Zap,
              color: 'bg-amber-500'
            },
            {
              title: 'Portal del Residente (Web & WA)',
              desc: 'Acceso multiplataforma para reservas, pagos y reportes de incidencias.',
              icon: Smartphone,
              color: 'bg-indigo-600'
            },
            {
              title: 'Seguridad Inteligente',
              desc: 'Monitoreo de accesos en tiempo real, control de visitas y registro fotográfico.',
              icon: Lock,
              color: 'bg-rose-500'
            },
            {
              title: 'Espacios Reservables',
              desc: 'Configura quinchos, gimnasios y parkings con reglas de reserva dinámicas.',
              icon: Globe,
              color: 'bg-emerald-500'
            },
            {
              title: 'Soporte VIP 24/7',
              desc: 'Acompañamiento humano y digital para que tu operación nunca se detenga.',
              icon: Headphones,
              color: 'bg-purple-600'
            }
          ].map((feat, i) => (
            <div key={i} className="group p-8 bg-slate-50 rounded-3xl border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className={`w-14 h-14 ${feat.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-${feat.color.split('-')[1]}-200 transform group-hover:rotate-6 transition-transform`}>
                <feat.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h3 className="text-3xl font-black text-slate-900">Lo que dicen los expertos</h3>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { name: 'Ricardo Mendez', role: 'Administrador de 15 Torres', text: 'ResiGuard cambió mi vida. Antes pasaba el 60% del día respondiendo mensajes básicos. Ahora el bot de WhatsApp gestiona todo lo rutinario.' },
             { name: 'Elena Solis', role: 'Presidenta de Consorcio', text: 'La transparencia financiera es impresionante. Como dueña, puedo ver exactamente en qué se gasta cada centavo de las expensas en tiempo real.' }
           ].map((t, i) => (
             <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm italic">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-600 mb-6 font-medium leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                   <div className="text-left">
                     <p className="text-sm font-bold text-slate-900">{t.name}</p>
                     <p className="text-xs text-slate-400 font-bold uppercase">{t.role}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <HelpCircle className="text-indigo-600" size={24} />
          <h3 className="text-3xl font-black text-slate-900">Preguntas Frecuentes</h3>
        </div>
        <div className="space-y-4">
          {[
            { q: '¿Cuánto tiempo toma la implementación?', a: 'Para un condominio estándar, la configuración inicial y carga de unidades toma menos de 48 horas con nuestras herramientas de carga masiva.' },
            { q: '¿Es seguro el acceso por WhatsApp?', a: 'Sí, utilizamos cifrado de extremo a extremo y verificación por número de teléfono registrado en nuestra base de datos oficial.' },
            { q: '¿Se integra con mis cámaras actuales?', a: 'Soportamos la mayoría de protocolos IP (ONVIF/RTSP) para que puedas ver tus cámaras directamente en nuestro dashboard.' }
          ].map((item, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:bg-slate-50 transition-colors">
              <h4 className="font-bold text-slate-900 mb-2">{item.q}</h4>
              <p className="text-slate-500 text-sm font-medium">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 md:px-12 bg-indigo-600 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8">¿Listo para transformar tu administración?</h2>
          <p className="text-indigo-100 text-xl mb-12 font-medium">Únete a cientos de edificios que ya están ahorrando tiempo y dinero con ResiGuard.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStart}
              className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:bg-slate-50 shadow-xl transition-all"
            >
              Agendar Demo Personalizada
            </button>
            <button className="px-10 py-5 bg-indigo-500 text-white rounded-2xl font-black text-lg hover:bg-indigo-400 transition-all border border-indigo-400">
              Ver Planes
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-600 rounded text-white">
                <Shield size={18} />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">ResiGuard</span>
            </div>
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors"><Globe size={16}/></div>
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors"><Users2 size={16}/></div>
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">© 2024 ResiGuard SaaS. Desarrollado para administradores del futuro.</p>
          <div className="flex gap-6 text-sm font-bold text-slate-500">
            <a href="#" className="hover:text-indigo-600">Privacidad</a>
            <a href="#" className="hover:text-indigo-600">Términos</a>
            <a href="#" className="hover:text-indigo-600">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
