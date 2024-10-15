import { Status } from "../status";
import { Utilisateur } from "./utilisateur.model";

export class Conge {
    idC!: string;
    dateDebut!: Date;
    dateFin!: Date;
    reason!: string;
    status!: Status; 
    dateValidation!: Date;
    title?: string; 
    countVacation: number = 30; 
    nom?:String ;
    Utilisateur?: Utilisateur;
    constructor(utilisateur?: Utilisateur) {
      if (utilisateur) {
          this.nom = utilisateur.username; 
      }
  }
  }
  