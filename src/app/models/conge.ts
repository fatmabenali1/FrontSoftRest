import { Status } from "../status";

export class Conge {
    idC!: string;
    dateDebut!: Date;
    dateFin!: Date;
    reason!: string;
    status!: Status; 
    dateValidation!: Date;
    title?: string; 
    fullName?:string;
    countVacation?:number;
  }
  