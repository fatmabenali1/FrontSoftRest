// src/app/conges-list/conges-list.component.ts
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

  constructor(private congeService: CongeService) { }

  ngOnInit(): void {
    this.loadConges();
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
  refuseVacation(vacation : Conge){
    const refuseVacation= {
      ...vacation,
      status:Status.REFUSED
    }
    this.congeService.updateConge(vacation.idC,refuseVacation).subscribe({
      next:(data : Conge)=>{

        console.log(data);

      },
      error:(err)=>{
        console.log(err);
      }
      

    }

    );
  }
  validateVacation(vacation : Conge){
    const validatevacation = {
      ...vacation,
      status:Status.VALIDATED
    }
    this.congeService.updateConge(vacation.idC,validatevacation).subscribe({
      next:(data:Conge)=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
