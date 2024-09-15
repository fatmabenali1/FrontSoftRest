import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Utilisateur } from '../models/utilisateur.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  utilisateur: Utilisateur = { username: '', password: '' }; // Initialisation du modèle utilisateur
  loginErrorMessage: string | null = null; // Assurez-vous que cette propriété est définie

  constructor(private authService: AuthService) { }

  onLogin(): void { // Assurez-vous que cette méthode est définie
    if (this.utilisateur.username && this.utilisateur.password) {
      this.authService.login(this.utilisateur.username, this.utilisateur.password).subscribe(
        (response: any) => {
          console.log('Utilisateur connecté avec succès', response);
          this.loginErrorMessage = null;
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la connexion', error);
          this.loginErrorMessage = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
        }
      );
    } else {
      this.loginErrorMessage = 'Veuillez entrer un email et un mot de passe.';
    }
  }
}
