// src/app/services/conge.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from '../models/conge';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  private apiUrl = 'http://localhost:3000/conges'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  // Get all congés
  getConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.apiUrl);
  }

  // Get a single congé by id
  getConge(id: string): Observable<Conge> {
    return this.http.get<Conge>(`${this.apiUrl}/${id}`);
  }

  // Add a new congé
  addConge(conge: Conge): Observable<Conge> {
    return this.http.post<Conge>(this.apiUrl, conge);
  }

  // Update an existing congé
  updateConge(id: string, conge: Conge): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/${id}`, conge);
  }

  // Delete a congé
  deleteConge(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
