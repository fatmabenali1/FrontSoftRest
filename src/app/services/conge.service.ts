import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, noop, throwError } from 'rxjs';
import { Conge } from '../models/conge';
import { response } from 'express';
import { Role } from '../enums/role.enum';  // Assurez-vous que l'importation est correcte
@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private apiUrl = 'http://localhost:8085/conges'; 

  constructor(private http: HttpClient) {}

  // Récupérer tous les congés
  getConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer un congé par ID
  getConge(idC: string): Observable<Conge> {
    return this.http.get<Conge>(`${this.apiUrl}/${idC}`).pipe(
      catchError(this.handleError)
    );
  }
  getCongesByStatus(status: string): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/${status}`);
  }
  // Ajouter un nouveau congé
  addConge(conge: Conge , iduser: String): Observable<Conge | null> {
    const url = `${this.apiUrl}/add/${iduser}`;
    return this.http.post<Conge | null>(url, conge,{observe:"response"}).pipe(
      map(result => result.body),
      catchError(this.handleError)

    );
  }
  searchConges(searchTerm: string): Observable<Conge[]> {
    const url = `${this.apiUrl}/search?term=${encodeURIComponent(searchTerm)}`;
    return this.http.get<Conge[]>(url);
  }
  // Mettre à jour un congé existant
  updateConge(idC: string, conge: Conge): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/${idC}`, conge).pipe(
      catchError(this.handleError)
    );
  }

  // Supprimer un congé
  deleteConge(idC: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${idC}`).pipe(
      catchError(this.handleError)
    );
  }
  getCongesByRole(role: Role): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/conges?role=${role}`);
}

  
  // Gestion des erreurs
  private handleError(error: any) {
    console.error('Une erreur est survenue', error);
    return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer.'));
  }
}
