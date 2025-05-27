import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/components/buttons/button.click.component';
import { AddProyectoComponent } from '../modals/add-proyecto/add-proyecto.component';
import { DataService } from '../../../core/service/data.service';
import { CommonModule } from '@angular/common';
import { AddActivitieComponent } from '../modals/add-activitie/add-activitie.component';
import { AddTaskComponent } from '../modals/add-task/add-task.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-proyectos',
  imports: [ButtonComponent, CommonModule,MatIconModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {
  constructor(public dialog: MatDialog, private DataService: DataService) {}

  selectedProject: any = null;
  availableUsers: any[] = [];
  projectActivities: { [projectId: string]: any[] } = {};
  tasksByActivity: { [activityId: string]: any[] } = {};
  expandedActivities: { [activityId: string]: boolean } = {};

  projects: any[] = [];
  expandedProjectId: string | null = null;

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.DataService.getProjects().subscribe(
      (data: any) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }

  activitiesByProject: { [key: string]: any[] } = {};

  toggleProject(projectId: string): void {
    if (this.expandedProjectId === projectId) {
      this.expandedProjectId = null;
      this.selectedProject = null;
    } else {
      this.expandedProjectId = projectId;
      this.selectedProject = this.projects.find(p => p._id === projectId);

      this.DataService.getProjectById(projectId).subscribe(
        (activities: any[]) => {
          this.activitiesByProject[projectId] = activities;
          activities.forEach(activity => {
            this.loadTasksForActivity(activity._id);
          });
        },
        error => {
          console.error('Error al cargar actividades:', error);
          this.activitiesByProject[projectId] = [];
        }
      );
    }
  }
  changeStatus(activityId: string): void {
  this.DataService.toggleActivityStatus(activityId).subscribe({
    next: (response) => {
      if (this.expandedProjectId) {
        this.DataService.getProjectById(this.expandedProjectId).subscribe(
          (activities: any[]) => {
            this.activitiesByProject[this.expandedProjectId!] = activities;
          },
          error => {
            console.error('Error al actualizar actividades:', error);
          }
        );
      }
    },
    error: (err) => {
      console.error('Error al cambiar estado', err);
    }
  });
}

  loadTasksForActivity(activityId: string): void {
    this.DataService.getTaskById(activityId).subscribe(
      (tasks: any[]) => {
        this.tasksByActivity[activityId] = tasks;
      },
      error => {
        console.error('Error al cargar tareas:', error);
        this.tasksByActivity[activityId] = [];
      }
    );
  }

  toggleActivityTasks(activityId: string): void {
    this.expandedActivities[activityId] = !this.expandedActivities[activityId];
    if (this.expandedActivities[activityId] && !this.tasksByActivity[activityId]) {
      this.loadTasksForActivity(activityId);
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(AddProyectoComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }

  openModalActivitie(): void {
    if (!this.selectedProject) {
      console.error('No project selected');
      return;
    }
    const dialogRef = this.dialog.open(AddActivitieComponent, {
      width: '500px',
      data: {
        projectId: this.selectedProject._id,
        availableUsers: this.availableUsers
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }

  openAssignTaskModal(activityId: string): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '500px',
      data: { activityId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasksForActivity(activityId);
      }
    });
  }

}