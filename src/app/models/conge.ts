import { Status } from "../status";

export class Conge {
    idC!: string;
    dateDebut!: Date;
    dateFin!: Date;
    reason!: string;
    status!: Status; 
    dateValidation!: Date;
    title?: string; 
    username?:string;
    countVacation?:number;
  }
  