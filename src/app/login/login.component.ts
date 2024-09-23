import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Utilisateur } from '../models/utilisateur.model';
import { Role } from '../enums/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  utilisateur: Utilisateur = { username: '', password: '' }; 
  roles: string[] = ['COLLABORATEUR', 'TECHLEAD', 'RH'];
  loginErrorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  onLogin(): void {
    if (this.utilisateur.username && this.utilisateur.password) {
      this.authService.login(this.utilisateur.username, this.utilisateur.password).subscribe(
        (response: Utilisateur) => {
          console.log('Utilisateur connecté avec succès', response);
          this.loginErrorMessage = null;
          this.onSubmit(response);
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

  onSubmit(user: Utilisateur): void {
    let returnUrl = '';
    if (user.role === Role.COLLABORATEUR) {
      returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/conges-list';
    } else if (user.role === Role.TECHLEAD || user.role === Role.RH) {
      returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/calendar';
    } else {
      this.loginErrorMessage = 'Rôle utilisateur non reconnu.';
      return;
    }

    // Redirection
    this.router.navigateByUrl(returnUrl);
  }
  logout(): void {
    const token = this.utilisateur.token; // Assurez-vous que 'token' est bien défini sur l'utilisateur
  
    if (token) {
      // Décoder le token pour obtenir la date d'expiration
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      
      const expirationDate = new Date(0); // Créer une date à partir de 1970
      expirationDate.setUTCSeconds(tokenPayload.exp); // 'exp' est le timestamp d'expiration du token
  
      // Comparer la date d'expiration avec la date actuelle
      if (expirationDate < new Date()) {
        console.log('Le token est expiré.');
        this.authService.logout(); // Appeler la méthode de déconnexion
        this.router.navigate(['/login']); // Rediriger vers la page de connexion
      } else {
        console.log('Le token est encore valide.');
      }
    } else {
      console.error('Aucun token trouvé.');
    }
  }
  
}
