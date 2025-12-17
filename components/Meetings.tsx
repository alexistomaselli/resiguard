
import React, { useState } from 'react';
import { AssemblyMeeting } from '../types';
import { Gavel, Calendar, Clock, FileText, CheckCircle2, ChevronRight, Users, Plus, Eye } from 'lucide-react';

interface MeetingsProps {
  meetings: AssemblyMeeting[];
}

export const Meetings: React.FC<MeetingsProps> = ({ meetings }) => {
  const [selectedMeeting, setSelectedMeeting] = useState<AssemblyMeeting | null>(null);

  return (
    <div className="p-6 h-full flex flex-col space-y-6 overflow-y-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Asambleas y Actas</h1>
          <p className="text-slate-500 text-sm">Registro de decisiones, votaciones y actas oficiales</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <Plus size={16} /> Programar Asamblea
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* List of Meetings */}
        <div className="xl:col-span-5 space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Cronograma de Reuniones</h3>
            {meetings.map(meeting => (
                <div 
                    key={meeting.id} 
                    onClick={() => setSelectedMeeting(meeting)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                        selectedMeeting?.id === meeting.id 
                        ? 'bg-white border-indigo-600 shadow-xl shadow-indigo-100 ring-1 ring-indigo-600' 
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
                    }`}
                >
                    <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${
                            meeting.type === 'Ordinaria' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                        }`}>
                            Asamblea {meeting.type}
                        </span>
                        {meeting.status === 'Realizada' ? (
                            <CheckCircle2 size={18} className="text-emerald-500" />
                        ) : (
                            <Clock size={18} className="text-amber-500" />
                        )}
                    </div>
                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{meeting.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Calendar size={14}/> {meeting.date}</span>
                        <span className="flex items-center gap-1"><Users size={14}/> 45 Propietarios</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Meeting Detail / Minutes Viewer */}
        <div className="xl:col-span-7">
            {selectedMeeting ? (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedMeeting.title}</h2>
                            <p className="text-sm text-slate-500 font-medium">Estado: {selectedMeeting.status}</p>
                        </div>
                        <div className="flex gap-2">
                             <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50"><FileText size={20}/></button>
                        </div>
                    </div>
                    
                    <div className="p-8 space-y-8">
                        <div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Orden del Día</h3>
                            <div className="space-y-3">
                                {selectedMeeting.topics.map((topic, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                        <ChevronRight size={16} className="text-indigo-600" />
                                        {topic}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedMeeting.minutes && (
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <FileText size={16} className="text-indigo-600" /> Resumen del Acta
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                    {selectedMeeting.minutes}
                                </p>
                                <button className="mt-6 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
                                    Descargar Acta Completa PDF <ChevronRight size={14}/>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-300 p-8 text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 mb-4">
                        <Gavel size={32} />
                    </div>
                    <h3 className="text-slate-900 font-bold mb-2">No hay asamblea seleccionada</h3>
                    <p className="text-sm text-slate-500 max-w-xs">Selecciona una asamblea del cronograma para ver el acta, temas tratados y resoluciones tomadas.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
