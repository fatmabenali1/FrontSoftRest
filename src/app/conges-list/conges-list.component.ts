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
  dateDebut: Date | undefined; // Changez ici
  endDate: Date | undefined; // Changez ici
  searchStatus: string = ''; // Ajout de la variable pour le statut de recherche

  constructor(private congeService: CongeService) {}

  ngOnInit(): void {
    this.loadConges();  
  }

  loadConges(): void {
    this.congeService.getConges().subscribe({
      next: (data: Conge[]) => {
        this.conges = data;
        console.log(this.conges);
      },
      error: (err: any) => {
        this.error = 'Erreur lors du chargement des congés';
        console.error(err);
      }
    });
  }

  onSearch(): void {
    this.congeService.searchConges(
      this.dateDebut, 
      this.endDate
    ).subscribe({
      next: (data: Conge[]) => {
        // Filtrez les congés par statut si searchStatus est renseigné
        this.conges = data.filter(conge => 
          conge.status.toLowerCase().includes(this.searchStatus.toLowerCase())
        );
      },
      error: (err: any) => {
        this.error = 'Erreur lors de la recherche des congés';
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
