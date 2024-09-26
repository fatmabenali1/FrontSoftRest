import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CongeService } from '../services/conge.service';
import { Conge } from '../models/conge';
import { AuthenticationService } from '../authentication.service';
import { Role } from '../enums/role.enum'; 
import { Status } from '../status';

@Component({
  selector: 'app-conge-form',
  templateUrl: './conge-form.component.html',
  styleUrls: ['./conge-form.component.css']
})
export class CongeFormComponent implements OnInit {
  congeForm!: FormGroup;
  congeId!: string | null;  // Pour la modification
  isTechlead = false;  // Indicateur pour vérifier si l'utilisateur est Techlead
  congesCollaborateurs: Conge[] = []; // Pour stocker les congés des collaborateurs

  constructor(
    private fb: FormBuilder,
    private congeService: CongeService,
    private router: Router,
    private route: ActivatedRoute,
    private authentificationservice: AuthenticationService
  ) {}

  ngOnInit(): void {
    // Vérifier le rôle de l'utilisateur connecté
    const currentUser = this.authentificationservice.userValue;
    this.isTechlead = currentUser?.role === Role.TECHLEAD;

    this.congeId = this.route.snapshot.paramMap.get('id') ?? '';  // Obtenir l'ID depuis la route si c'est pour la modification
    this.initForm();
    
    // Si modification, charger les détails du congé existant
    if (this.congeId) {
      this.congeService.getConge(this.congeId).subscribe({
        next: (conge: Conge) => this.congeForm.patchValue(conge),
        error: (err) => console.error('Erreur lors de la récupération du congé:', err)
      });
    }

    // Charger les demandes de congé des collaborateurs si ce n'est pas un Techlead
    if (!this.isTechlead) {
      this.loadCollaboratorsCongeRequests();
    }
  }

  // Initialiser le formulaire avec validation
  initForm(): void {
    this.congeForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      reason: ['', Validators.required],
      dateValidation: ['']  // Pas requis initialement
    });
  }

  // Charger la liste des demandes de congé des collaborateurs
  loadCollaboratorsCongeRequests(): void {
    this.congeService.getCongesByRole(Role.COLLABORATEUR).subscribe({
      next: (conges: Conge[]) => {
        this.congesCollaborateurs = conges;
        console.log('Demandes de congé des collaborateurs:', conges);
      },
      error: (err) => console.error('Erreur lors de la récupération des demandes de collaborateurs:', err)
    });
  }

  // Méthode pour annuler ou revenir à une autre page
  cancel(): void {
    this.router.navigate(['/conges-list']); // Redirection ou autre action
  }

  // Méthode pour enregistrer les données du formulaire
  save(): void {
    if (this.congeForm.invalid) return;

    const congeData: Conge = this.congeForm.value;
    
    if (this.isTechlead) {
      if (this.congeId) {
        // Mettre à jour le congé existant
        this.congeService.updateConge(this.congeId, congeData).subscribe({
          next: () => this.router.navigate(['/calendar']),
          error: (err) => console.error('Erreur lors de la mise à jour du congé:', err)
        });
      } else {
        const idUser = this.authentificationservice.userValue?.idU; // Assurez-vous que l'ID existe
        // Créer un nouveau congé
        if (idUser) { // Vérification pour s'assurer que idUser n'est pas undefined
          this.congeService.addConge(congeData, idUser.toString()).subscribe({
            next: () => this.router.navigate(['/calendar']),
            error: (err) => console.error('Erreur lors de l\'ajout du congé:', err)
          });
        } else {
          console.error('L\'ID de l\'utilisateur est introuvable.');
        }
      }
    } else {
      console.warn('Accès non autorisé pour ajouter un congé. Seul un Techlead peut le faire.');
      // Vous pouvez également gérer cette situation d'une autre manière (par exemple, afficher un message à l'utilisateur)
    }
  }

  // Méthode pour naviguer vers la page de calendrier
  navigateToCalendar(): void {
    console.log('Navigating to calendar...');
    this.router.navigate(['/calendar']); 
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
      Status: Status.VALIDATED
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
