import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:8085/inscription'; // URL de l'API pour l'inscription
  private loginUrl = 'http://localhost:8085/connexion'; 
  constructor(private http: HttpClient) { }

  register(user: Utilisateur): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password });
  }
}
