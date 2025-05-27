export interface Task {
  activityId: string;
  title: string;
  description: string;
  prioridad: string;
  fecha_limite: string; // o Date si prefieres
  instrucciones?: string;
  asignados?: string[];
  status?: string;
}
