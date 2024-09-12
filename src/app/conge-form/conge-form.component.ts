// src/app/conge-form/conge-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CongeService } from '../services/conge.service';
import { Conge } from '../models/conge';
import { Status } from '../status';

@Component({
  selector: 'app-conge-form',
  templateUrl: './conge-form.component.html',
  styleUrls: ['./conge-form.component.css']
})
export class CongeFormComponent implements OnInit {
  congeForm!: FormGroup;
  congeId!: string | null;  // For editing

  constructor(
    private fb: FormBuilder,
    private congeService: CongeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.congeId = this.route.snapshot.paramMap.get('id');  // Get the id from the route if it's for edit
    this.initForm();
    
    // If editing, load the existing conge details
    if (this.congeId) {
      this.congeService.getConge(this.congeId).subscribe({
        next: (conge: Conge) => this.congeForm.patchValue(conge),
        error: (err) => console.error('Error fetching conge:', err)
      });
    }
  }

  // Initialize the form with validation
  initForm(): void {
    this.congeForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      reason: ['', Validators.required],
      dateValidation: ['']  // Not required initially
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
    
    if (this.congeId) {
      // Update existing conge
      this.congeService.updateConge(this.congeId, congeData).subscribe({
        next: () => this.router.navigate(['/conges-list']),
        error: (err) => console.error('Error updating conge:', err)
      });
    } else {
      // Create new conge
      this.congeService.addConge(congeData).subscribe({
        next: () => this.router.navigate(['/conges-list']),
        error: (err) => console.error('Error adding conge:', err)
      });
    }
  }
}
