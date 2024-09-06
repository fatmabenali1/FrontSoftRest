import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Utilisateur } from '../models/utilisateur.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: Utilisateur = { nom: '', role: '', password: '' }; // Initialisation du modèle utilisateur
  roles: string[] = ['COLLABORATEUR', 'TECHLEAD', 'RH']; // Liste des rôles disponibles
  registerErrorMessage: string | null = null;
  successMessage: string | null = null; // For successful registration messages

  constructor(private authService: AuthService) { }

  onRegister(): void {
    if (this.isFormValid()) { // Validate the form before submission
      this.authService.register(this.user).subscribe(
        (response) => {
          console.log('Utilisateur enregistré avec succès', response);
          this.successMessage = 'Inscription réussie. Vous pouvez vous connecter maintenant.';
          this.registerErrorMessage = null;
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'inscription', error);
          this.registerErrorMessage = this.getErrorMessage(error);
          this.successMessage = null;
        }
      );
    } else {
      this.registerErrorMessage = 'Veuillez remplir tous les champs.';
      this.successMessage = null;
    }
  }

  private isFormValid(): boolean {
    // Basic form validation with checks for undefined or empty values
    return this.user.nom?.trim() !== '' &&
           this.user.role?.trim() !== '' &&
           this.user.password?.trim() !== '';
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    // Customize error messages based on the error response
    switch (error.status) {
      case 400:
        return 'Données invalides. Veuillez vérifier les informations.';
      case 409:
        return 'Nom d\'utilisateur déjà utilisé.';
      case 500:
        return 'Erreur serveur. Veuillez réessayer plus tard.';
      default:
        console.log(`Unexpected error status: ${error.status}`);
        return 'Une erreur est survenue. Veuillez réessayer.';
    }
  }
}
