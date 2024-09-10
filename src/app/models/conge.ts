export class Conge {
    idC!: string;
    dateDebut!: Date;
    dateFin!: Date;
    status!: string;  // "En attente", "Validé Techlead", "Validé RH", "Refusé"
    dateValidation!: Date;
    title?: string; // Ajoutez cette ligne si elle n'existe pas déjà

  }
  