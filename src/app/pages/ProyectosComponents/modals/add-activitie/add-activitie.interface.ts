export interface Activity {
  projectId: string;
  name: string;
  description: string;
  priority: 'bajo' | 'medio' | 'alto';
  status: 'no_iniciada' | 'en_progreso' | 'completada';
  startDate: string;
  endDate: string;
  asignados: string[];
  horas_estimadas: number;
  horas_reales?: number;
}

export interface UserOption {
  email: string;
  name: string;
}