
import React, { useState } from 'react';
import { Space, Person } from '../types';
import { Building, Layout, Plus, Users, Car, Coffee, Home, Trash2, Edit2, CheckSquare, Square } from 'lucide-react';

interface SpacesProps {
  spaces: Space[];
  setSpaces: React.Dispatch<React.SetStateAction<Space[]>>;
  currentCondoId: string;
}

export const Spaces: React.FC<SpacesProps> = ({ spaces, setSpaces, currentCondoId }) => {
  const [activeTab, setActiveTab] = useState<'UNITS' | 'COMMON'>('UNITS');
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  
  // Batch Form State
  const [batchConfig, setBatchConfig] = useState({
    prefix: '', // e.g. "Floor" or empty
    start: 1,
    end: 10,
    suffix: '', // e.g. "A", "B"
    category: 'Departamento'
  });

  const filteredSpaces = spaces.filter(s => 
    s.condoId === currentCondoId && 
    (activeTab === 'UNITS' ? s.type === 'UNIT' : s.type === 'COMMON')
  );

  const handleBatchGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSpaces: Space[] = [];
    for (let i = batchConfig.start; i <= batchConfig.end; i++) {
      const name = `${batchConfig.prefix}${i}${batchConfig.suffix}`;
      newSpaces.push({
        id: Math.random().toString(36).substr(2, 9),
        condoId: currentCondoId,
        name: name,
        type: 'UNIT',
        category: batchConfig.category,
        isReservable: false,
        status: 'Vacío'
      });
    }
    setSpaces([...spaces, ...newSpaces]);
    setIsBatchModalOpen(false);
  };

  const handleAddCommonArea = () => {
    const name = prompt("Nombre del área común (ej: Quincho Sur):");
    if (!name) return;
    
    const newSpace: Space = {
      id: Math.random().toString(36).substr(2, 9),
      condoId: currentCondoId,
      name,
      type: 'COMMON',
      category: 'Amenidad',
      isReservable: true,
      status: 'Vacío'
    };
    setSpaces([...spaces, newSpace]);
  };

  const toggleReservable = (id: string) => {
    setSpaces(spaces.map(s => s.id === id ? { ...s, isReservable: !s.isReservable } : s));
  };

  const assignPerson = (spaceId: string, role: 'owner' | 'tenant') => {
    const name = prompt(`Nombre del ${role === 'owner' ? 'Propietario' : 'Inquilino'}:`);
    if (!name) return; // In real app, this would be a user search modal
    
    const person: Person = {
        id: Math.random().toString(36),
        name: name,
        email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
        phone: '555-0000'
    };

    setSpaces(spaces.map(s => {
        if (s.id !== spaceId) return s;
        return {
            ...s,
            [role]: person,
            status: role === 'tenant' ? 'Ocupado' : (s.status === 'Ocupado' ? 'Ocupado' : 'Vacío')
        };
    }));
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Espacios</h1>
          <p className="text-slate-500 text-sm">Configuración de Unidades y Áreas Comunes</p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'UNITS' ? (
             <button 
                onClick={() => setIsBatchModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
             >
                <Layout size={16} /> Generar Unidades en Lote
             </button>
          ) : (
             <button 
                onClick={handleAddCommonArea}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
             >
                <Plus size={16} /> Nueva Área Común
             </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button 
          onClick={() => setActiveTab('UNITS')}
          className={`px-6 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'UNITS' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Home size={18} /> Unidades Funcionales (Deptos/Oficinas)
        </button>
        <button 
          onClick={() => setActiveTab('COMMON')}
          className={`px-6 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'COMMON' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Coffee size={18} /> Espacios Comunes & Amenidades
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpaces.map(space => (
            <div key={space.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-lg ${space.type === 'UNIT' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {space.category === 'Parking' ? <Car size={20}/> : space.type === 'UNIT' ? <Home size={20}/> : <Coffee size={20}/>}
                   </div>
                   <div>
                       <h3 className="font-bold text-slate-800">{space.name}</h3>
                       <p className="text-xs text-slate-500">{space.category}</p>
                   </div>
                </div>
                {space.type === 'COMMON' && (
                    <button onClick={() => toggleReservable(space.id)} className="flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded cursor-pointer hover:bg-slate-200">
                        {space.isReservable ? <CheckSquare size={14} className="text-blue-600"/> : <Square size={14}/>}
                        Reservable
                    </button>
                )}
              </div>

              {space.type === 'UNIT' ? (
                  <div className="space-y-3 border-t border-slate-100 pt-3">
                      <div className="flex justify-between items-center group">
                          <span className="text-xs text-slate-500 uppercase font-semibold">Propietario</span>
                          {space.owner ? (
                              <span className="text-sm font-medium text-slate-800">{space.owner.name}</span>
                          ) : (
                              <button onClick={() => assignPerson(space.id, 'owner')} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                  <Plus size={12}/> Asignar
                              </button>
                          )}
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500 uppercase font-semibold">Inquilino</span>
                          {space.tenant ? (
                              <span className="text-sm font-medium text-slate-800">{space.tenant.name}</span>
                          ) : (
                              <button onClick={() => assignPerson(space.id, 'tenant')} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                  <Plus size={12}/> Asignar
                              </button>
                          )}
                      </div>
                      
                      <div className="mt-4 bg-slate-50 p-2 rounded text-center">
                          <p className="text-xs text-slate-500 mb-1">Responsable de Expensas</p>
                          <p className="text-sm font-bold text-slate-800">
                              {space.tenant ? 'Inquilino' : space.owner ? 'Propietario' : 'N/A'}
                          </p>
                      </div>
                  </div>
              ) : (
                  <div className="mt-2">
                      <p className="text-sm text-slate-600">Este espacio es parte de las áreas comunes del condominio.</p>
                      {space.isReservable && <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Disponible para reservas</span>}
                  </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Batch Generation Modal */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
               <h2 className="text-lg font-bold text-slate-800 mb-4">Generar Unidades en Lote</h2>
               <form onSubmit={handleBatchGenerate} className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                       <div>
                           <label className="text-xs font-bold text-slate-500 uppercase">Prefijo</label>
                           <input placeholder="Ej: Piso " className="w-full border p-2 rounded text-sm" value={batchConfig.prefix} onChange={e => setBatchConfig({...batchConfig, prefix: e.target.value})} />
                       </div>
                       <div>
                           <label className="text-xs font-bold text-slate-500 uppercase">Sufijo</label>
                           <input placeholder="Ej: A" className="w-full border p-2 rounded text-sm" value={batchConfig.suffix} onChange={e => setBatchConfig({...batchConfig, suffix: e.target.value})} />
                       </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                       <div>
                           <label className="text-xs font-bold text-slate-500 uppercase">Desde (N°)</label>
                           <input type="number" className="w-full border p-2 rounded text-sm" value={batchConfig.start} onChange={e => setBatchConfig({...batchConfig, start: Number(e.target.value)})} />
                       </div>
                       <div>
                           <label className="text-xs font-bold text-slate-500 uppercase">Hasta (N°)</label>
                           <input type="number" className="w-full border p-2 rounded text-sm" value={batchConfig.end} onChange={e => setBatchConfig({...batchConfig, end: Number(e.target.value)})} />
                       </div>
                   </div>
                   <div>
                       <label className="text-xs font-bold text-slate-500 uppercase">Categoría</label>
                       <select className="w-full border p-2 rounded text-sm" value={batchConfig.category} onChange={e => setBatchConfig({...batchConfig, category: e.target.value})}>
                           <option>Departamento</option>
                           <option>Oficina</option>
                           <option>Local Comercial</option>
                           <option>Parking</option>
                       </select>
                   </div>
                   <div className="pt-4 flex justify-end gap-2">
                       <button type="button" onClick={() => setIsBatchModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded text-sm">Cancelar</button>
                       <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">Generar</button>
                   </div>
               </form>
           </div>
        </div>
      )}
    </div>
  );
};
