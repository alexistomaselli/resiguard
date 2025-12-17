
import React, { useState } from 'react';
import { Condominium } from '../types';
import { Building, MapPin, Plus, MoreVertical, CheckCircle, XCircle } from 'lucide-react';

interface SaaSAdminProps {
  condos: Condominium[];
  setCondos: React.Dispatch<React.SetStateAction<Condominium[]>>;
  onSelectCondo: (id: string) => void;
}

export const SaaSAdmin: React.FC<SaaSAdminProps> = ({ condos, setCondos, onSelectCondo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCondo, setNewCondo] = useState<Partial<Condominium>>({
    name: '', address: '', planType: 'Pro', status: 'Activo'
  });

  const handleCreateCondo = (e: React.FormEvent) => {
    e.preventDefault();
    const condo: Condominium = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCondo.name!,
      address: newCondo.address!,
      planType: newCondo.planType as any,
      unitCount: 0,
      status: 'Activo'
    };
    setCondos([...condos, condo]);
    setIsModalOpen(false);
    setNewCondo({ name: '', address: '', planType: 'Pro', status: 'Activo' });
  };

  return (
    <div className="p-8 h-full bg-slate-100 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Administración de Plataforma</h1>
            <p className="text-slate-500">Gestión global de Condominios (SaaS)</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-medium shadow-lg shadow-slate-900/20 flex items-center gap-2 transition-all"
          >
            <Plus size={20} /> Registrar Condominio
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {condos.map(condo => (
            <div key={condo.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Building size={24} />
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-1">{condo.name}</h3>
              <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                <MapPin size={14} /> {condo.address}
              </div>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Plan</span>
                  <span className="font-medium text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{condo.planType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Unidades Totales</span>
                  <span className="font-medium text-slate-900">{condo.unitCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Estado</span>
                  <span className={`flex items-center gap-1 font-medium ${condo.status === 'Activo' ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {condo.status === 'Activo' ? <CheckCircle size={14}/> : <XCircle size={14}/>} {condo.status}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => onSelectCondo(condo.id)}
                className="w-full py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                Gestionar
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Nuevo Condominio</h2>
            <form onSubmit={handleCreateCondo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Condominio</label>
                <input required className="w-full border p-2.5 rounded-lg" value={newCondo.name} onChange={e => setNewCondo({...newCondo, name: e.target.value})} placeholder="Ej: Torres del Sol" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dirección</label>
                <input required className="w-full border p-2.5 rounded-lg" value={newCondo.address} onChange={e => setNewCondo({...newCondo, address: e.target.value})} placeholder="Av. Principal 123" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plan de Suscripción</label>
                <select className="w-full border p-2.5 rounded-lg" value={newCondo.planType} onChange={e => setNewCondo({...newCondo, planType: e.target.value as any})}>
                  <option>Básico</option>
                  <option>Pro</option>
                  <option>Enterprise</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Crear Condominio</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
