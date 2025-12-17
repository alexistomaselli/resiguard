
import React, { useState } from 'react';
import { FileText, Search, Upload, Book, ShieldAlert, CheckCircle } from 'lucide-react';

export const Regulations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    { id: 1, title: 'Capítulo I: De la Propiedad', content: 'Define los límites de las unidades funcionales y el porcentaje de participación en las áreas comunes.' },
    { id: 2, title: 'Capítulo II: Convivencia y Ruidos', content: 'Establece los horarios de descanso (22:00 a 08:00) y las normas para el uso de instrumentos musicales.' },
    { id: 3, title: 'Capítulo III: Uso de Amenidades', content: 'Regula la reserva del quincho, piscina y gimnasio. Se requiere reserva previa vía sistema.' },
    { id: 4, title: 'Capítulo IV: Mascotas', content: 'Permite animales domésticos siempre que se utilicen las áreas de tránsito con correa.' },
    { id: 5, title: 'Capítulo V: Sanciones', content: 'Detalla el proceso de multas ante el incumplimiento reiterado de las normas de convivencia.' }
  ];

  return (
    <div className="p-6 h-full flex flex-col space-y-6 overflow-y-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reglamento y Normativas</h1>
          <p className="text-slate-500 text-sm">Documentación legal y pautas de convivencia del edificio</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all">
            <Upload size={16} /> Subir Documento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Sidebar of documents */}
        <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Documentos Oficiales</h3>
                <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center gap-2">
                        <Book size={16}/> Reglamento de Copropiedad
                    </button>
                    <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-slate-600 font-bold text-sm flex items-center gap-2 transition-colors">
                        <ShieldAlert size={16}/> Manual de Convivencia
                    </button>
                    <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-slate-600 font-bold text-sm flex items-center gap-2 transition-colors">
                        <CheckCircle size={16}/> Normas Piscina 2024
                    </button>
                </div>
            </div>
            
            <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-xl shadow-indigo-100">
                <FileText className="mb-4 opacity-50" size={32} />
                <h4 className="font-bold mb-2">Última Actualización</h4>
                <p className="text-xs text-indigo-100 mb-4 leading-relaxed">Las normas de uso del Quincho fueron actualizadas por la Asamblea del 15 de Octubre.</p>
                <button className="text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1.5 rounded hover:bg-white/30 transition-colors">Ver Cambios</button>
            </div>
        </div>

        {/* Right: Content Viewer */}
        <div className="lg:col-span-3 space-y-6">
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Buscar en el reglamento..." 
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 space-y-8">
                    {sections.map(section => (
                        <div key={section.id} className="group">
                            <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">{section.id}</span>
                                {section.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed pl-11">{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
