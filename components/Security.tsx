import React from 'react';
import { AccessLog } from '../types';
import { ShieldCheck, ShieldAlert, Video, Filter } from 'lucide-react';

interface SecurityProps {
  logs: AccessLog[];
}

export const Security: React.FC<SecurityProps> = ({ logs }) => {
  return (
    <div className="p-6 h-full flex flex-col space-y-6 overflow-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Seguridad y Acceso</h1>
          <p className="text-slate-500 text-sm">Cámaras en vivo y registros de acceso</p>
        </div>
        <div className="flex gap-2">
            <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-medium text-red-600">Monitoreo en Vivo Activo</span>
        </div>
      </div>

      {/* CCTV Grid (Simulated) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Entrada Principal', 'Estacionamiento B1', 'Lobby Este'].map((cam, idx) => (
            <div key={idx} className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-sm group">
                <img 
                    src={`https://picsum.photos/600/340?random=${idx + 10}`} 
                    alt="CCTV Feed" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-mono flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    GRAB
                </div>
                <div className="absolute bottom-2 left-2 text-white text-xs font-medium shadow-black drop-shadow-md">
                    CAM-{idx + 1}: {cam}
                </div>
            </div>
        ))}
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Video size={18} className="text-slate-400"/> Registros Recientes
            </h3>
            <button className="text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-50 rounded-lg">
                <Filter size={18} />
            </button>
        </div>
        
        <div className="overflow-y-auto flex-1 p-0">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Hora</th>
                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Ubicación</th>
                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Identidad</th>
                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Tipo</th>
                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Estado</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-3 text-sm text-slate-600 font-mono">{log.timestamp}</td>
                            <td className="px-6 py-3 text-sm text-slate-800">{log.location}</td>
                            <td className="px-6 py-3 text-sm text-slate-800 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                    {log.personName.charAt(0)}
                                </div>
                                {log.personName}
                            </td>
                            <td className="px-6 py-3 text-sm text-slate-600">{log.type}</td>
                            <td className="px-6 py-3">
                                {log.status === 'Permitido' ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                        <ShieldCheck size={12} /> Permitido
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        <ShieldAlert size={12} /> Denegado
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};