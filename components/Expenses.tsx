
import React from 'react';
import { ExpenseRecord } from '../types';
import { Wallet, TrendingUp, AlertCircle, CheckCircle2, DollarSign, Download, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExpensesProps {
  expenses: ExpenseRecord[];
}

export const Expenses: React.FC<ExpensesProps> = ({ expenses }) => {
  const totalDue = expenses.reduce((acc, curr) => acc + (curr.status !== 'Pagado' ? curr.amount : 0), 0);
  const totalPaid = expenses.reduce((acc, curr) => acc + (curr.status === 'Pagado' ? curr.amount : 0), 0);
  const collectionsRate = (totalPaid / (totalPaid + totalDue)) * 100;

  const chartData = [
    { name: 'Pagado', value: totalPaid },
    { name: 'Adeudado', value: totalDue },
  ];

  return (
    <div className="p-6 h-full flex flex-col space-y-6 overflow-y-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Expensas</h1>
          <p className="text-slate-500 text-sm">Control financiero, cobros y trazabilidad de pagos</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                <Download size={16} /> Exportar Reporte
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                <DollarSign size={16} /> Generar Cuotas
            </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <TrendingUp size={24} />
                </div>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+{collectionsRate.toFixed(1)}%</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Total Recaudado (Mes)</p>
            <p className="text-2xl font-black text-slate-900">${totalPaid.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <AlertCircle size={24} />
                </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Pendiente de Cobro</p>
            <p className="text-2xl font-black text-slate-900">${totalDue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center">
             <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" hide />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Wallet size={18} className="text-slate-400"/> Listado de Unidades
            </h3>
            <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Filter size={18}/></button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Unidad</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Responsable</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Monto</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Estado</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Acción</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {expenses.map((exp) => (
                        <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">Unidad {exp.unitName}</td>
                            <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${exp.payerType === 'Inquilino' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                    {exp.payerType}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-black text-slate-700">${exp.amount.toLocaleString()}</td>
                            <td className="px-6 py-4">
                                {exp.status === 'Pagado' ? (
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                                        <CheckCircle2 size={14} /> {exp.status}
                                    </span>
                                ) : (
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${exp.status === 'Atrasado' ? 'text-red-600' : 'text-amber-600'}`}>
                                        <AlertCircle size={14} /> {exp.status}
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">Ver Detalles</button>
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
