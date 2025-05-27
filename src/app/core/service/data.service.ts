import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {

    return this.http.post(`${environment.apiUrl}/users`, userData);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users`);
  }
  getLastUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/last-registered`)
  }

  getFirstNames(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/firstnames`);
  }
  toggleUserStatus(id: string): Observable<any> {
    return this.http.patch(
      `${environment.apiUrl}/users/${id}/toggle-status`,
      {}
    );
  }
  toggleActivityStatus(id: string): Observable<any> {
    return this.http.patch(
      `${environment.apiUrl}/actividades/${id}/toggle-status`,
      {}
    );
  }


  createProject(projectData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/proyectos`, projectData);
  }

  createActivity(activityData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/actividades`, activityData);
  }
  getActivitiesByProject(projectId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/actividades/${projectId}`);
  }
  getProjects(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/proyectos`);
  }
  getProjectById(projectId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/actividades/proyecto/${projectId}`);
  }
  getTaskById(activityId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/tasks/activity/${activityId}`);
  }
  createTask(taskData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/tasks`, taskData);
  }
}