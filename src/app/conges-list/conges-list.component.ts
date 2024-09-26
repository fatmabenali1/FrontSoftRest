import { Component, OnInit } from '@angular/core';
import { CongeService } from '../services/conge.service'; // Assurez-vous que ce chemin est correct
import { Conge } from '../models/conge';
import { Status } from '../status';

@Component({
  selector: 'app-conges-list',
  templateUrl: './conges-list.component.html',
  styleUrls: ['./conges-list.component.css']
})
export class CongesListComponent implements OnInit {
  conges: Conge[] = [];
  error: string = '';

  constructor(private congeService: CongeService) {}

  ngOnInit(): void {
    this.loadConges();  // Charge tous les congés initialement
  }

  // Fonction pour rechercher les congés par statut
  onSearch(event: any): void {
    const status = event.target.value.trim();

    if (status) {
      this.getCongesByStatus(status);  // Appelle la recherche par statut si l'input n'est pas vide
    } else {
      this.loadConges();  // Recharge tous les congés si l'input est vide
    }
  }

  getCongesByStatus(status: string): void {
    this.congeService.getCongesByStatus(status).subscribe({
      next: (data: Conge[]) => {
        this.conges = data;
      },
      error: (err: any) => {
        this.error = 'Erreur lors de la recherche des congés';
        console.error(err);
      }
    });
  }

  loadConges(): void {
    this.congeService.getConges().subscribe({
      next: (data: Conge[]) => {
        this.conges = data;
      },
      error: (err: any) => {
        this.error = 'Erreur lors du chargement des congés';
        console.error(err);
      }
    });
  }

  refuseVacation(vacation: Conge): void {
    const refuseVacation = {
      ...vacation,
      status: Status.REFUSED
    };
    this.congeService.updateConge(vacation.idC, refuseVacation).subscribe({
      next: (data: Conge) => {
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  validateVacation(vacation: Conge): void {
    const validateVacation = {
      ...vacation,
      status: Status.VALIDATED
    };
    this.congeService.updateConge(vacation.idC, validateVacation).subscribe({
      next: (data: Conge) => {
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
