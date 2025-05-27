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
  getFirstNames(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/firstnames`);
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