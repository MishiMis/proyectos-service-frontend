
export interface Contractor {
  name: string;
  contact: string;
}

export type ProjectStatus = 'pendiente' | 'en_progreso' | 'completado' | 'cancelado';

export interface ProjectForm {
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  endDate: string;
  actualEndDate: string | null;
  contractors: Contractor[];
  responsables: string[];
  observaciones: string;
}

export interface StatusOption {
  value: ProjectStatus;
  label: string;
}