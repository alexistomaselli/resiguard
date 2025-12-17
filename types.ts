
export enum ViewState {
  LANDING = 'LANDING',
  SAAS_DASHBOARD = 'SAAS_DASHBOARD',
  DASHBOARD = 'DASHBOARD',
  SPACES = 'SPACES',
  RESIDENTS = 'RESIDENTS',
  MAINTENANCE = 'MAINTENANCE',
  SECURITY = 'SECURITY',
  AMENITIES = 'AMENITIES',
  EXPENSES = 'EXPENSES', // New: Financial management
  REGULATIONS = 'REGULATIONS', // New: Bylaws and documents
  MEETINGS = 'MEETINGS' // New: Assemblies and minutes
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  CONDO_ADMIN = 'CONDO_ADMIN',
  OWNER = 'OWNER',
  TENANT = 'TENANT'
}

export interface Condominium {
  id: string;
  name: string;
  address: string;
  planType: 'Básico' | 'Pro' | 'Enterprise';
  unitCount: number;
  status: 'Activo' | 'Inactivo';
}

export type SpaceType = 'UNIT' | 'COMMON';

export interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface Space {
  id: string;
  condoId: string;
  name: string;
  type: SpaceType; 
  category: string;
  isReservable: boolean;
  owner?: Person;
  tenant?: Person;
  status: 'Ocupado' | 'Vacío' | 'Mantenimiento';
}

export enum MaintenancePriority {
  LOW = 'Baja',
  MEDIUM = 'Media',
  HIGH = 'Alta',
  CRITICAL = 'Crítica'
}

export enum MaintenanceStatus {
  PENDING = 'Pendiente',
  IN_PROGRESS = 'En Progreso',
  COMPLETED = 'Completado'
}

export interface MaintenanceTicket {
  id: string;
  title: string;
  description: string;
  unit: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  category: string;
  createdAt: string;
  reportedBy?: string; 
  assignedTo?: string; 
  aiAnalysis?: string; 
  history: MaintenanceHistoryItem[];
}

export interface MaintenanceHistoryItem {
  id: string;
  date: string;
  action: string;
  note?: string;
  user: string;
}

export interface AccessLog {
  id: string;
  timestamp: string;
  location: string;
  personName: string;
  type: 'Entrada' | 'Salida';
  status: 'Permitido' | 'Denegado';
}

export interface AmenityBooking {
  id: string;
  spaceId: string;
  amenityName: string;
  tenantName: string;
  date: string;
  timeSlot: string;
  status: 'Confirmado' | 'Pendiente';
}

export interface CommunicationLog {
  id: string;
  date: string;
  type: 'Email' | 'Teléfono' | 'Presencial' | 'Sistema';
  notes: string;
  adminName: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  status: 'Activo' | 'Inactivo' | 'Pasado';
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  paymentFrequency: 'Mensual' | 'Trimestral' | 'Anual';
  avatarUrl?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  communicationHistory: CommunicationLog[];
}

export interface ExpenseRecord {
  id: string;
  unitName: string;
  month: string;
  amount: number;
  status: 'Pagado' | 'Pendiente' | 'Atrasado';
  payerType: 'Dueño' | 'Inquilino';
  paidAt?: string;
}

export interface AssemblyMeeting {
  id: string;
  title: string;
  date: string;
  type: 'Ordinaria' | 'Extraordinaria';
  status: 'Programada' | 'Realizada' | 'Cancelada';
  minutes?: string; // Acta de la asamblea
  topics: string[];
}
