import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from '../models/conge';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  private apiUrl = 'http://localhost:8085/conges'; 
  constructor(private http: HttpClient) {}

  // Récupérer tous les congés
  getConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.apiUrl);
  }

  // Récupérer un congé par ID
  getConge(idC: string): Observable<Conge> {
    return this.http.get<Conge>(`${this.apiUrl}/${idC}`);
  }

  // Ajouter un nouveau congé
  addConge(conge: Conge): Observable<Conge> {
    return this.http.post<Conge>(this.apiUrl, conge);  // Utilisez this.apiUrl ici
  }

  // Mettre à jour un congé existant
  updateConge(idC: string, conge: Conge): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/${idC}`, conge);
  }

  // Supprimer un congé
  deleteConge(idC: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${idC}`);
  }
}
