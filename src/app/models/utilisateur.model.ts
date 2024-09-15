// src/app/models/utilisateur.model.ts
export class Utilisateur {
    idU?: string;        // Optionnel, car peut être généré automatiquement
    username?: string;
    email?: string;
    password?: string;   // Veillez à sécuriser ce champ correctement
    role?: string;       // Exemples : "COLLABORATEUR", "TECHLEAD", "RH"
  }
  