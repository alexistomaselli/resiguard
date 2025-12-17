import React, { useState } from 'react';
import { Tenant, CommunicationLog } from '../types';
import { Search, Mail, Phone, MoreVertical, Plus, X, User, DollarSign, Calendar, MessageSquare, Save } from 'lucide-react';

interface TenantsProps {
  tenants: Tenant[];
  setTenants: React.Dispatch<React.SetStateAction<Tenant[]>>;
}

export const Tenants: React.FC<TenantsProps> = ({ tenants, setTenants }) => {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New Tenant Form State
  const [newTenant, setNewTenant] = useState<Partial<Tenant>>({
    name: '', email: '', phone: '', unit: '', rentAmount: 0, leaseStart: '', leaseEnd: '',
    paymentFrequency: 'Mensual', status: 'Activo', 
    emergencyContact: { name: '', phone: '', relation: '' }
  });

  // Note State
  const [newNote, setNewNote] = useState('');

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    const tenant: Tenant = {
      id: Math.random().toString(36).substr(2, 9),
      ...newTenant as Tenant,
      avatarUrl: `https://picsum.photos/200?random=${Math.random()}`,
      communicationHistory: []
    };
    setTenants([...tenants, tenant]);
    setIsAddModalOpen(false);
    setNewTenant({
        name: '', email: '', phone: '', unit: '', rentAmount: 0, leaseStart: '', leaseEnd: '',
        paymentFrequency: 'Mensual', status: 'Activo', 
        emergencyContact: { name: '', phone: '', relation: '' }
    });
  };

  const handleAddNote = () => {
    if (!selectedTenant || !newNote.trim()) return;
    const log: CommunicationLog = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      type: 'Sistema',
      notes: newNote,
      adminName: 'Admin'
    };
    
    const updatedTenant = {
      ...selectedTenant,
      communicationHistory: [log, ...selectedTenant.communicationHistory]
    };

    setTenants(tenants.map(t => t.id === selectedTenant.id ? updatedTenant : t));
    setSelectedTenant(updatedTenant);
    setNewNote('');
  };

  return (
    <div className="p-6 h-full overflow-hidden flex flex-col relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Directorio de Inquilinos</h1>
          <p className="text-slate-500 text-sm">Administrar residentes, contratos y comunicaciones</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Agregar Inquilino
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o unidad..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-4">Inquilino</div>
          <div className="col-span-2">Unidad</div>
          <div className="col-span-3">Contacto</div>
          <div className="col-span-2">Estado</div>
          <div className="col-span-1 text-right">Acciones</div>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1">
          {filteredTenants.map((tenant) => (
            <div 
              key={tenant.id} 
              onClick={() => setSelectedTenant(tenant)}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="col-span-4 flex items-center gap-3">
                <img src={tenant.avatarUrl} alt={tenant.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{tenant.name}</p>
                  <p className="text-xs text-slate-500">Fin contrato: {tenant.leaseEnd}</p>
                </div>
              </div>
              
              <div className="col-span-2">
                <span className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                  Unidad {tenant.unit}
                </span>
              </div>

              <div className="col-span-3 space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Mail size={12} /> {tenant.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Phone size={12} /> {tenant.phone}
                </div>
              </div>

              <div className="col-span-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  tenant.status === 'Activo' ? 'bg-emerald-100 text-emerald-800' :
                  tenant.status === 'Pasado' ? 'bg-slate-100 text-slate-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {tenant.status}
                </span>
              </div>

              <div className="col-span-1 text-right">
                <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-all">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Tenant Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-800">Registrar Nuevo Inquilino</h2>
                    <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                </div>
                <form onSubmit={handleAddTenant} className="p-6 space-y-6">
                    {/* Personal Info */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2"><User size={16}/> Información Personal</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input required placeholder="Nombre Completo" className="border p-2 rounded-lg text-sm" value={newTenant.name} onChange={e => setNewTenant({...newTenant, name: e.target.value})} />
                            <input required placeholder="Email" type="email" className="border p-2 rounded-lg text-sm" value={newTenant.email} onChange={e => setNewTenant({...newTenant, email: e.target.value})} />
                            <input required placeholder="Teléfono" className="border p-2 rounded-lg text-sm" value={newTenant.phone} onChange={e => setNewTenant({...newTenant, phone: e.target.value})} />
                            <input required placeholder="Número de Unidad" className="border p-2 rounded-lg text-sm" value={newTenant.unit} onChange={e => setNewTenant({...newTenant, unit: e.target.value})} />
                        </div>
                    </div>
                    
                    {/* Lease Info */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2"><DollarSign size={16}/> Detalles del Contrato</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Inicio de Contrato</label>
                                <input type="date" required className="w-full border p-2 rounded-lg text-sm" value={newTenant.leaseStart} onChange={e => setNewTenant({...newTenant, leaseStart: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Fin de Contrato</label>
                                <input type="date" required className="w-full border p-2 rounded-lg text-sm" value={newTenant.leaseEnd} onChange={e => setNewTenant({...newTenant, leaseEnd: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Monto de Renta ($)</label>
                                <input type="number" required className="w-full border p-2 rounded-lg text-sm" value={newTenant.rentAmount} onChange={e => setNewTenant({...newTenant, rentAmount: Number(e.target.value)})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Frecuencia de Pago</label>
                                <select className="w-full border p-2 rounded-lg text-sm" value={newTenant.paymentFrequency} onChange={e => setNewTenant({...newTenant, paymentFrequency: e.target.value as any})}>
                                    <option>Mensual</option>
                                    <option>Trimestral</option>
                                    <option>Anual</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div>
                         <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2"><Phone size={16}/> Contacto de Emergencia</h3>
                         <div className="grid grid-cols-3 gap-4">
                            <input required placeholder="Nombre de Contacto" className="border p-2 rounded-lg text-sm" value={newTenant.emergencyContact?.name} onChange={e => setNewTenant({...newTenant, emergencyContact: {...newTenant.emergencyContact!, name: e.target.value}})} />
                            <input required placeholder="Teléfono" className="border p-2 rounded-lg text-sm" value={newTenant.emergencyContact?.phone} onChange={e => setNewTenant({...newTenant, emergencyContact: {...newTenant.emergencyContact!, phone: e.target.value}})} />
                            <input required placeholder="Relación" className="border p-2 rounded-lg text-sm" value={newTenant.emergencyContact?.relation} onChange={e => setNewTenant({...newTenant, emergencyContact: {...newTenant.emergencyContact!, relation: e.target.value}})} />
                         </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancelar</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* Tenant Details Slide-over/Modal */}
      {selectedTenant && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
            <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="p-6 bg-slate-900 text-white">
                    <button onClick={() => setSelectedTenant(null)} className="mb-4 text-slate-400 hover:text-white"><X size={24}/></button>
                    <div className="flex items-center gap-4">
                        <img src={selectedTenant.avatarUrl} alt="" className="w-16 h-16 rounded-full border-2 border-white/20"/>
                        <div>
                            <h2 className="text-xl font-bold">{selectedTenant.name}</h2>
                            <p className="text-slate-400 text-sm">Unidad {selectedTenant.unit} • {selectedTenant.status}</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Contact & Emergency */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Contacto</h3>
                            <p className="text-sm text-slate-800 flex items-center gap-2 mb-1"><Mail size={14} className="text-slate-400"/> {selectedTenant.email}</p>
                            <p className="text-sm text-slate-800 flex items-center gap-2"><Phone size={14} className="text-slate-400"/> {selectedTenant.phone}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Emergencia</h3>
                            <p className="text-sm font-medium text-slate-800">{selectedTenant.emergencyContact.name}</p>
                            <p className="text-xs text-slate-500">{selectedTenant.emergencyContact.relation}</p>
                            <p className="text-xs text-slate-500">{selectedTenant.emergencyContact.phone}</p>
                        </div>
                    </div>

                    {/* Lease Details */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2"><Calendar size={14}/> Acuerdo de Contrato</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-slate-500 text-xs">Periodo</p>
                                <p className="font-medium text-slate-800">{selectedTenant.leaseStart} a {selectedTenant.leaseEnd}</p>
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs">Renta Mensual</p>
                                <p className="font-medium text-slate-800">${selectedTenant.rentAmount.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Communication Log */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><MessageSquare size={16}/> Historial de Comunicación</h3>
                        <div className="space-y-4 mb-4">
                            {selectedTenant.communicationHistory.length === 0 && <p className="text-sm text-slate-400 italic">No hay historial registrado.</p>}
                            {selectedTenant.communicationHistory.map(log => (
                                <div key={log.id} className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-slate-700">{log.type}</span>
                                        <span className="text-[10px] text-slate-400">{log.date} por {log.adminName}</span>
                                    </div>
                                    <p className="text-sm text-slate-600">{log.notes}</p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Add Note Input */}
                        <div className="flex gap-2 items-start">
                            <textarea 
                                className="flex-1 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none" 
                                placeholder="Agregar una nota..."
                                rows={2}
                                value={newNote}
                                onChange={e => setNewNote(e.target.value)}
                            />
                            <button 
                                onClick={handleAddNote}
                                disabled={!newNote.trim()}
                                className="bg-slate-800 hover:bg-slate-900 text-white p-2 rounded-lg disabled:opacity-50"
                            >
                                <Save size={18} />
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