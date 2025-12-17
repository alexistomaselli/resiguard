
import React from 'react';
import { AmenityBooking, Space } from '../types';
import { Calendar, Droplets, Dumbbell, Utensils, Car, Coffee } from 'lucide-react';

interface AmenitiesProps {
  bookings: AmenityBooking[];
  spaces: Space[]; // Now takes spaces to dynamically show reservable areas
}

export const Amenities: React.FC<AmenitiesProps> = ({ bookings, spaces }) => {
  // Filter only reservable common spaces
  const reservableSpaces = spaces.filter(s => s.type === 'COMMON' && s.isReservable);

  const getIcon = (category: string) => {
    switch(category.toLowerCase()) {
        case 'gym': return Dumbbell;
        case 'piscina': return Droplets;
        case 'bbq': case 'quincho': return Utensils;
        case 'parking': return Car;
        default: return Coffee;
    }
  };

  return (
    <div className="p-6 h-full flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reservas de Espacios</h1>
          <p className="text-slate-500 text-sm">Áreas comunes habilitadas por la administración</p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Calendar size={16} /> Ver Calendario
        </button>
      </div>

      {reservableSpaces.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl text-center mb-8">
              <p className="text-yellow-800 font-medium">No hay espacios configurados como "Reservables" en este condominio.</p>
              <p className="text-yellow-600 text-sm mt-1">Vaya a "Gestión de Espacios" para configurar áreas comunes.</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {reservableSpaces.map(space => {
                const Icon = getIcon(space.category || space.name);
                return (
                    <div key={space.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-all">
                        <div className="h-32 bg-slate-800 relative flex items-center justify-center">
                            <Icon size={48} className="text-slate-600 opacity-50" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                    <Icon size={20} /> {space.name}
                                </h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between text-sm text-slate-600 mb-4">
                                <span>Categoría: {space.category}</span>
                                <span className="text-emerald-600 font-medium">Disponible</span>
                            </div>
                            <button className="w-full py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-semibold transition-colors">
                                Reservar Ahora
                            </button>
                        </div>
                    </div>
                );
            })}
          </div>
      )}

      <h2 className="text-lg font-bold text-slate-800 mb-4">Próximas Reservas Confirmadas</h2>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Espacio</th>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Residente</th>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Fecha y Hora</th>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Estado</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {bookings.map(booking => (
                          <tr key={booking.id}>
                              <td className="px-6 py-3 text-sm font-medium text-slate-800">{booking.amenityName}</td>
                              <td className="px-6 py-3 text-sm text-slate-600">{booking.tenantName}</td>
                              <td className="px-6 py-3 text-sm text-slate-600">{booking.date} a las {booking.timeSlot}</td>
                              <td className="px-6 py-3">
                                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                                      {booking.status}
                                  </span>
                              </td>
                          </tr>
                      ))}
                      {bookings.length === 0 && (
                          <tr>
                              <td colSpan={4} className="p-6 text-center text-slate-400 text-sm">No hay reservas registradas.</td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};
