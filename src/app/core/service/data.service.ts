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
}