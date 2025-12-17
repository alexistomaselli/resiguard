import React, { useState, useCallback } from 'react';
import { MaintenanceTicket, MaintenancePriority, MaintenanceStatus, Tenant, MaintenanceHistoryItem } from '../types';
import { analyzeMaintenanceTicket } from '../services/geminiService';
import { Sparkles, Plus, CheckCircle2, Clock, Wrench, User, AlertTriangle, X, Send } from 'lucide-react';

interface MaintenanceProps {
  tickets: MaintenanceTicket[];
  setTickets: React.Dispatch<React.SetStateAction<MaintenanceTicket[]>>;
  tenants: Tenant[];
}

const STAFF_MEMBERS = ['Personal Interno', 'Mario Plomería', 'Luigi Electricidad', 'Seguridad SafeGuard', 'CleanCo'];

export const Maintenance: React.FC<MaintenanceProps> = ({ tickets, setTickets, tenants }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket | null>(null);
  const [newUpdateNote, setNewUpdateNote] = useState('');
  
  // Creation Form State
  const [description, setDescription] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [unit, setUnit] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{priority: string, category: string, suggestedAction: string} | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!description) return;
    setIsAnalyzing(true);
    const result = await analyzeMaintenanceTicket(description);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  }, [description]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: MaintenanceTicket = {
      id: Math.random().toString(36).substr(2, 9),
      title: analysisResult ? `Problema de ${analysisResult.category}` : 'Nueva Solicitud',
      description: description,
      unit: unit || 'Desconocido', 
      priority: (analysisResult?.priority as MaintenancePriority) || MaintenancePriority.MEDIUM,
      status: MaintenanceStatus.PENDING,
      category: analysisResult?.category || 'General',
      createdAt: new Date().toISOString().split('T')[0],
      aiAnalysis: analysisResult?.suggestedAction,
      reportedBy: reportedBy || 'Admin',
      history: [{
          id: Math.random().toString(36),
          date: new Date().toISOString().split('T')[0],
          action: 'Ticket Creado',
          user: 'Admin'
      }]
    };
    setTickets([newTicket, ...tickets]);
    setIsModalOpen(false);
    setDescription('');
    setReportedBy('');
    setUnit('');
    setAnalysisResult(null);
  };

  const handleUpdateTicket = (ticketId: string, updates: Partial<MaintenanceTicket>, historyAction: string) => {
    setTickets(tickets.map(t => {
        if (t.id === ticketId) {
            const newHistoryItem: MaintenanceHistoryItem = {
                id: Math.random().toString(36),
                date: new Date().toISOString().split('T')[0],
                action: historyAction,
                note: newUpdateNote || undefined,
                user: 'Admin'
            };
            return {
                ...t,
                ...updates,
                history: [newHistoryItem, ...t.history]
            };
        }
        return t;
    }));
    if (selectedTicket && selectedTicket.id === ticketId) {
       // Update local selected state to show changes immediately
       setSelectedTicket(prev => prev ? ({
            ...prev, 
            ...updates, 
            history: [{
                id: Math.random().toString(36),
                date: new Date().toISOString().split('T')[0],
                action: historyAction,
                note: newUpdateNote || undefined,
                user: 'Admin'
            }, ...prev.history]
       }) : null);
    }
    setNewUpdateNote('');
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'Alta': return 'text-red-600 bg-red-50 border-red-200';
      case 'Crítica': return 'text-red-700 bg-red-100 border-red-300';
      case 'Media': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  // Auto-fill unit when tenant is selected
  const handleTenantSelect = (tenantName: string) => {
      setReportedBy(tenantName);
      const tenant = tenants.find(t => t.name === tenantName);
      if (tenant) setUnit(tenant.unit);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Solicitudes de Mantenimiento</h1>
          <p className="text-slate-500 text-sm">Gestionar reparaciones, asignaciones y peticiones</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Nueva Solicitud
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-20">
        {tickets.map(ticket => (
          <div 
            key={ticket.id} 
            onClick={() => setSelectedTicket(ticket)}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`px-2 py-1 text-xs font-semibold rounded-md border ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
              <span className="text-xs text-slate-400">{ticket.createdAt}</span>
            </div>
            
            <h3 className="text-slate-800 font-semibold mb-1 group-hover:text-indigo-600 transition-colors">{ticket.title}</h3>
            <p className="text-slate-600 text-sm mb-3 line-clamp-2">{ticket.description}</p>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">
                Unidad {ticket.unit}
              </span>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">
                {ticket.category}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
               <div className="flex items-center gap-2 text-sm">
                  {ticket.status === 'Pendiente' && <Clock size={16} className="text-amber-500"/>}
                  {ticket.status === 'En Progreso' && <Wrench size={16} className="text-blue-500"/>}
                  {ticket.status === 'Completado' && <CheckCircle2 size={16} className="text-emerald-500"/>}
                  <span className="text-slate-700">{ticket.status}</span>
               </div>
               <div className="flex -space-x-2">
                   {ticket.assignedTo ? (
                       <div title={ticket.assignedTo} className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold border border-white">
                           {ticket.assignedTo.charAt(0)}
                       </div>
                   ) : (
                       <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs border border-white">?</div>
                   )}
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Crear Solicitud de Mantenimiento</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Reportado Por</label>
                    <select 
                        className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                        value={reportedBy}
                        onChange={(e) => handleTenantSelect(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar Residente</option>
                        {tenants.map(t => <option key={t.id} value={t.name}>{t.name} (Unidad {t.unit})</option>)}
                    </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Descripción</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
                    placeholder="Describe el problema en detalle..."
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={!description || isAnalyzing}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    <Sparkles size={16} />
                    {isAnalyzing ? 'Analizando...' : 'Analizar con IA'}
                  </button>
                  {analysisResult && (
                    <div className="text-right">
                      <span className="text-xs font-bold block text-slate-700">Detectado: {analysisResult.category}</span>
                      <span className="text-xs text-slate-500">Prioridad: {analysisResult.priority}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium"
                  >
                    Crear Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Details View */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl h-[80vh] flex overflow-hidden">
                 {/* Left Panel: Details */}
                 <div className="w-2/3 p-8 overflow-y-auto border-r border-slate-100">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-md border ${getPriorityColor(selectedTicket.priority)}`}>
                                {selectedTicket.priority}
                            </span>
                            <h2 className="text-2xl font-bold text-slate-800 mt-2">{selectedTicket.title}</h2>
                            <p className="text-sm text-slate-500">Ticket #{selectedTicket.id} • Creado el {selectedTicket.createdAt}</p>
                        </div>
                        <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-slate-600 p-2"><X size={24}/></button>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <h3 className="text-sm font-bold text-slate-700 mb-2">Descripción del Problema</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{selectedTicket.description}</p>
                        </div>

                        {selectedTicket.aiAnalysis && (
                            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex gap-3">
                                <Sparkles className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                                <div>
                                    <h3 className="text-sm font-bold text-indigo-800 mb-1">Recomendación IA</h3>
                                    <p className="text-indigo-700 text-sm">{selectedTicket.aiAnalysis}</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Reportado Por</h3>
                                <div className="flex items-center gap-3">
                                    <div className="bg-slate-200 p-2 rounded-full"><User size={20} className="text-slate-500"/></div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{selectedTicket.reportedBy || 'Desconocido'}</p>
                                        <p className="text-xs text-slate-500">Unidad {selectedTicket.unit}</p>
                                    </div>
                                </div>
                            </div>
                             <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Asignado A</h3>
                                <select 
                                    className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white"
                                    value={selectedTicket.assignedTo || ''}
                                    onChange={(e) => handleUpdateTicket(selectedTicket.id, { assignedTo: e.target.value }, `Asignado a ${e.target.value}`)}
                                >
                                    <option value="">Sin Asignar</option>
                                    {STAFF_MEMBERS.map(staff => <option key={staff} value={staff}>{staff}</option>)}
                                </select>
                            </div>
                        </div>
                        
                        <div>
                             <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Estado Actual</h3>
                             <div className="flex gap-2">
                                 {[MaintenanceStatus.PENDING, MaintenanceStatus.IN_PROGRESS, MaintenanceStatus.COMPLETED].map(status => (
                                     <button
                                        key={status}
                                        onClick={() => handleUpdateTicket(selectedTicket.id, { status }, `Estado cambiado a ${status}`)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                            selectedTicket.status === status 
                                            ? 'bg-slate-800 text-white border-slate-800' 
                                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                        }`}
                                     >
                                         {status}
                                     </button>
                                 ))}
                             </div>
                        </div>
                    </div>
                 </div>

                 {/* Right Panel: History */}
                 <div className="w-1/3 bg-slate-50 flex flex-col border-l border-slate-200">
                     <div className="p-4 border-b border-slate-200 bg-white">
                         <h3 className="font-bold text-slate-800">Historial de Actividad</h3>
                     </div>
                     <div className="flex-1 overflow-y-auto p-4 space-y-4">
                         {selectedTicket.history.map((item) => (
                             <div key={item.id} className="relative pl-4 border-l-2 border-slate-200 pb-2">
                                 <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                                 <p className="text-xs text-slate-400 mb-0.5">{item.date} • {item.user}</p>
                                 <p className="text-sm font-medium text-slate-700">{item.action}</p>
                                 {item.note && <p className="text-sm text-slate-600 bg-white p-2 rounded border border-slate-200 mt-1 italic">"{item.note}"</p>}
                             </div>
                         ))}
                     </div>
                     <div className="p-4 bg-white border-t border-slate-200">
                         <div className="flex gap-2">
                             <input 
                                type="text" 
                                placeholder="Agregar nota..." 
                                className="flex-1 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={newUpdateNote}
                                onChange={(e) => setNewUpdateNote(e.target.value)}
                             />
                             <button 
                                onClick={() => handleUpdateTicket(selectedTicket.id, {}, 'Nota agregada')}
                                disabled={!newUpdateNote}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg disabled:opacity-50"
                             >
                                 <Send size={18} />
                             </button>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
      )}
    </div>
  );
};