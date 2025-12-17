
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Wrench, Shield, Coffee, Bell, Building, Globe, ChevronDown, Layout, LogOut, Wallet, FileText, Gavel } from 'lucide-react';
import { ViewState, Tenant, MaintenanceTicket, AccessLog, MaintenancePriority, MaintenanceStatus, AmenityBooking, Condominium, Space, UserRole, ExpenseRecord, AssemblyMeeting } from './types';
import { Dashboard } from './components/Dashboard';
import { Tenants } from './components/Tenants';
import { Maintenance } from './components/Maintenance';
import { Security } from './components/Security';
import { Amenities } from './components/Amenities';
import { SaaSAdmin } from './components/SaaSAdmin';
import { Spaces } from './components/Spaces';
import { Landing } from './components/Landing';
import { Expenses } from './components/Expenses';
import { Regulations } from './components/Regulations';
import { Meetings } from './components/Meetings';

// MOCK DATA GENERATORS
const mockCondos: Condominium[] = [
    { id: 'c1', name: 'Residencias Vista Sol', address: 'Av. Libertador 123', planType: 'Pro', unitCount: 45, status: 'Activo' },
    { id: 'c2', name: 'Edificio Los Laureles', address: 'Calle 50, Centro', planType: 'Básico', unitCount: 12, status: 'Activo' },
];

const generateMockExpenses = (): ExpenseRecord[] => [
    { id: 'e1', unitName: '101', month: 'Octubre 2024', amount: 1500, status: 'Pagado', payerType: 'Inquilino', paidAt: '2024-10-05' },
    { id: 'e2', unitName: '102', month: 'Octubre 2024', amount: 1500, status: 'Pendiente', payerType: 'Dueño' },
    { id: 'e3', unitName: '201', month: 'Octubre 2024', amount: 1800, status: 'Atrasado', payerType: 'Inquilino' },
    { id: 'e4', unitName: '202', month: 'Octubre 2024', amount: 1800, status: 'Pagado', payerType: 'Dueño', paidAt: '2024-10-10' },
];

const generateMockMeetings = (): AssemblyMeeting[] => [
    { 
        id: 'm1', 
        title: 'Asamblea Anual Ordinaria 2024', 
        date: '2024-10-15', 
        type: 'Ordinaria', 
        status: 'Realizada',
        topics: ['Aprobación de Balance 2023', 'Renovación de Consejo', 'Presupuesto 2025'],
        minutes: 'Se aprobó el balance con 85% de votos positivos. Se decidió aumentar el fondo de reserva un 5%.'
    },
    { 
        id: 'm2', 
        title: 'Extraordinaria: Impermeabilización', 
        date: '2024-12-05', 
        type: 'Extraordinaria', 
        status: 'Programada',
        topics: ['Presupuestos Techos', 'Cuota Extraordinaria'],
    }
];

const generateMockSpaces = (condoId: string): Space[] => {
    if (condoId === 'c1') {
        return [
            { id: 's1', condoId, name: '101', type: 'UNIT', category: 'Departamento', isReservable: false, status: 'Ocupado', owner: { id: 'p1', name: 'Mario Rossi', email: 'mario@email.com', phone: '555-100' }, tenant: { id: 't1', name: 'Sofia Ramirez', email: 'sofia@email.com', phone: '555-0101' } },
            { id: 's2', condoId, name: '102', type: 'UNIT', category: 'Departamento', isReservable: false, status: 'Ocupado', owner: { id: 'p2', name: 'Luigi Verdi', email: 'luigi@email.com', phone: '555-200' } },
            { id: 's3', condoId, name: 'Quincho Norte', type: 'COMMON', category: 'Quincho', isReservable: true, status: 'Vacío' },
            { id: 's4', condoId, name: 'Piscina', type: 'COMMON', category: 'Piscina', isReservable: true, status: 'Vacío' },
        ];
    }
    return [
         { id: 's5', condoId, name: '1A', type: 'UNIT', category: 'Oficina', isReservable: false, status: 'Vacío', owner: { id: 'p3', name: 'Inversiones SA', email: 'info@inv.com', phone: '555-999' } }
    ];
};

const generateMockTenants = (): Tenant[] => [
  { 
    id: '1', 
    name: 'Sofia Ramirez', 
    unit: '101', 
    email: 'sofia@example.com', 
    phone: '555-0101', 
    status: 'Activo', 
    leaseStart: '2023-12-01',
    leaseEnd: '2024-12-01', 
    rentAmount: 2400,
    paymentFrequency: 'Mensual',
    avatarUrl: 'https://picsum.photos/200?random=1',
    emergencyContact: { name: 'Carlos Ruiz', phone: '555-9999', relation: 'Amigo' },
    communicationHistory: []
  },
];

const generateMockTickets = (): MaintenanceTicket[] => [
  { id: 't1', title: 'Grifo Goteando', description: 'Goteo constante en baño principal.', unit: '101', priority: MaintenancePriority.LOW, status: MaintenanceStatus.PENDING, category: 'Plomería', createdAt: '2023-10-25', reportedBy: 'Sofia Ramirez', history: [] },
];

const generateMockLogs = (): AccessLog[] => [
  { id: 'l1', timestamp: '10:45 AM', location: 'Entrada Principal', personName: 'Sofia Ramirez', type: 'Entrada', status: 'Permitido' },
];

const generateMockBookings = (): AmenityBooking[] => [
    { id: 'b1', spaceId: 's3', amenityName: 'Quincho Norte', tenantName: 'Sofia Ramirez', date: '2023-10-27', timeSlot: '14:00 - 16:00', status: 'Confirmado' },
];

const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.CONDO_ADMIN);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  
  const [condos, setCondos] = useState<Condominium[]>([]);
  const [currentCondoId, setCurrentCondoId] = useState<string>('c1');
  
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [bookings, setBookings] = useState<AmenityBooking[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [meetings, setMeetings] = useState<AssemblyMeeting[]>([]);

  useEffect(() => {
    setCondos(mockCondos);
    setSpaces([...generateMockSpaces('c1'), ...generateMockSpaces('c2')]);
    setTickets(generateMockTickets());
    setTenants(generateMockTenants());
    setLogs(generateMockLogs());
    setBookings(generateMockBookings());
    setExpenses(generateMockExpenses());
    setMeetings(generateMockMeetings());
  }, []);

  const currentCondoData = condos.find(c => c.id === currentCondoId);

  const switchRole = (role: UserRole) => {
      setActiveRole(role);
      if (role === UserRole.SUPER_ADMIN) {
          setCurrentView(ViewState.SAAS_DASHBOARD);
      } else {
          setCurrentView(ViewState.DASHBOARD);
      }
  };

  const handleCondoSelect = (id: string) => {
      setCurrentCondoId(id);
      setActiveRole(UserRole.CONDO_ADMIN);
      setCurrentView(ViewState.DASHBOARD);
  };

  const logout = () => {
    setCurrentView(ViewState.LANDING);
  };

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState; icon: any; label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        currentView === view
          ? 'bg-indigo-600 text-white shadow-md'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  if (currentView === ViewState.LANDING) {
    return <Landing onStart={() => setCurrentView(ViewState.DASHBOARD)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans animate-in fade-in duration-500 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20 transition-all h-full">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${activeRole === UserRole.SUPER_ADMIN ? 'bg-purple-600' : 'bg-indigo-600'}`}>
                {activeRole === UserRole.SUPER_ADMIN ? <Globe size={24} /> : <Shield size={24} />}
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight">ResiGuard</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                    {activeRole === UserRole.SUPER_ADMIN ? 'SaaS Admin' : 'Gestión Condominio'}
                </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {activeRole === UserRole.SUPER_ADMIN ? (
              <NavItem view={ViewState.SAAS_DASHBOARD} icon={Globe} label="Plataforma SaaS" />
          ) : (
              <>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-2 mt-4">Principal</div>
                <NavItem view={ViewState.DASHBOARD} icon={LayoutDashboard} label="Tablero" />
                <NavItem view={ViewState.SPACES} icon={Layout} label="Espacios" />
                <NavItem view={ViewState.RESIDENTS} icon={Users} label="Residentes" />
                
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-2 mt-4">Gestión</div>
                <NavItem view={ViewState.EXPENSES} icon={Wallet} label="Expensas" />
                <NavItem view={ViewState.MAINTENANCE} icon={Wrench} label="Mantenimiento" />
                <NavItem view={ViewState.AMENITIES} icon={Coffee} label="Reservas" />
                
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-2 mt-4">Institucional</div>
                <NavItem view={ViewState.MEETINGS} icon={Gavel} label="Asambleas" />
                <NavItem view={ViewState.REGULATIONS} icon={FileText} label="Reglamento" />
                <NavItem view={ViewState.SECURITY} icon={Shield} label="Seguridad" />
              </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-800/30">
            <div className="mb-4">
                <label className="text-xs text-slate-500 uppercase font-bold mb-2 block text-center">Configuración</label>
                <div className="relative">
                    <select 
                        className="w-full bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded p-2 appearance-none cursor-pointer focus:ring-1 focus:ring-indigo-500 outline-none"
                        value={activeRole}
                        onChange={(e) => switchRole(e.target.value as UserRole)}
                    >
                        <option value={UserRole.CONDO_ADMIN}>Admin Condominio</option>
                        <option value={UserRole.SUPER_ADMIN}>Super Admin (SaaS)</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-2.5 text-slate-500 pointer-events-none"/>
                </div>
            </div>
            <button 
                onClick={logout}
                className="w-full mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors py-2 border border-slate-700 rounded hover:bg-slate-800"
            >
                <LogOut size={14} /> Salir
            </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen relative overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm shrink-0">
           <div>
               {activeRole === UserRole.SUPER_ADMIN ? (
                   <h2 className="text-slate-800 font-bold text-lg">Panel Global de Administración</h2>
               ) : (
                   <div className="flex items-center gap-3">
                        <Building size={18} className="text-indigo-600"/> 
                        <div>
                            <h2 className="text-slate-800 font-bold text-sm leading-none">{currentCondoData?.name}</h2>
                            <p className="text-[10px] text-slate-400 font-medium">{currentCondoData?.address}</p>
                        </div>
                   </div>
               )}
           </div>
           <div className="flex items-center space-x-4">
               <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                   <Bell size={20} />
                   <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
               </button>
               <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-700">Administrador</p>
                        <p className="text-[10px] text-slate-400">Ver Perfil</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        AD
                    </div>
               </div>
           </div>
        </header>

        <div className="flex-1 overflow-hidden relative bg-slate-50">
            {currentView === ViewState.SAAS_DASHBOARD && (
                <SaaSAdmin condos={condos} setCondos={setCondos} onSelectCondo={handleCondoSelect} />
            )}
            {currentView === ViewState.DASHBOARD && (
                <Dashboard tickets={tickets} tenants={tenants} logs={logs} />
            )}
            {currentView === ViewState.SPACES && (
                <Spaces spaces={spaces} setSpaces={setSpaces} currentCondoId={currentCondoId} />
            )}
            {currentView === ViewState.RESIDENTS && (
                <Tenants tenants={tenants} setTenants={setTenants} />
            )}
            {currentView === ViewState.EXPENSES && (
                <Expenses expenses={expenses} />
            )}
            {currentView === ViewState.MAINTENANCE && (
                <Maintenance tickets={tickets} setTickets={setTickets} tenants={tenants} />
            )}
            {currentView === ViewState.SECURITY && (
                <Security logs={logs} />
            )}
            {currentView === ViewState.AMENITIES && (
                <Amenities bookings={bookings} spaces={spaces.filter(s => s.condoId === currentCondoId)} />
            )}
            {currentView === ViewState.REGULATIONS && (
                <Regulations />
            )}
            {currentView === ViewState.MEETINGS && (
                <Meetings meetings={meetings} />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
