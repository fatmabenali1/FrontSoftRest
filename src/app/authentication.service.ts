import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../app/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // Vérifiez si 'user' existe dans localStorage et parsez uniquement si ce n'est pas null
        const userJson = localStorage.getItem('user');
        let user: User | null = null;
        if (userJson) {
            try {
                user = JSON.parse(userJson);
            } catch (error) {
                console.error('Erreur lors de la lecture du JSON de localStorage:', error);
                // Vous pouvez gérer l'erreur ou réinitialiser l'utilisateur ici si nécessaire
            }
        }
        this.userSubject = new BehaviorSubject<User | null>(user);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User | null {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe(map(user => {
                // stocke les détails de l'utilisateur et le jeton JWT dans localStorage pour maintenir la connexion entre les actualisations de page
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                console.log(user);
                return user;
            }));
    }

    logout() {
        // supprime l'utilisateur de localStorage pour déconnecter l'utilisateur
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/loginn']);
    }
}
