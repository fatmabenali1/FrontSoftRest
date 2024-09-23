import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  catchError, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Utilisateur } from './models/utilisateur.model';
import { Conge } from './models/conge';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<Utilisateur | null>;
    public user: Observable<Utilisateur | null>;
    private apiUrl = 'http://localhost:8085'; // Remplacez par votre URL d'API
    private loginUrl = 'http://localhost:8085/connexion'; 

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // Vérifiez si 'user' existe dans localStorage et parsez uniquement si ce n'est pas null
        const userJson = localStorage.getItem('user');
        let user: Utilisateur | null = null;
        if (userJson) {
            try {
                user = JSON.parse(userJson);
            } catch (error) {
                console.error('Erreur lors de la lecture du JSON de localStorage:', error);
                // Vous pouvez gérer l'erreur ou réinitialiser l'utilisateur ici si nécessaire
            }
        }
        this.userSubject = new BehaviorSubject<Utilisateur | null>(user);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): Utilisateur | null {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.loginUrl, { username, password })
            .pipe(map(user => {
                // stocke les détails de l'utilisateur et le jeton JWT dans localStorage pour maintenir la connexion entre les actualisations de page
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                console.log(user);
                return user;
            }));
    }

    logout(): void {
        // Appel du backend pour la déconnexion
        this.http.post(`${this.apiUrl}/logout`, {observer : "response"}).subscribe(
          (response) => {
            console.log('Déconnexion réussie', response);
            // Supprime le token du stockage local (localStorage ou sessionStorage)
            localStorage.removeItem('token');
            // Rediriger vers la page de login après déconnexion
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Erreur lors de la déconnexion', error);
            this.router.navigate(['/login']);
            localStorage.removeItem('token');

          }
        );
      }
    
      // Méthode pour vérifier si l'utilisateur est authentifié
      isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
      }
      register(utilisateur: Utilisateur): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/inscription`, utilisateur)
            .pipe(map(response => {
                console.log('Utilisateur enregistré avec succès', response);
                return response;
            }));
    }
}
