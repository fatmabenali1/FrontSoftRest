import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CongeService } from '../services/conge.service';
import { Conge } from '../models/conge';

@Component({
  selector: 'app-manage-leaves',
  templateUrl: './manage-leaves.component.html',
  styleUrls: ['./manage-leaves.component.css']
})
export class ManageLeavesComponent implements OnInit {
  conges: Conge[] = [];
  error: string | null = null;  // Ajoutez cette ligne

  constructor(
    private congeService: CongeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadConges();
  }

  loadConges(): void {
    this.congeService.getConges().subscribe({
      next: (data) => this.conges = data,
      error: (err) => this.error = 'Failed to load leaves.'
    });
  }

  addLeave(): void {
    this.router.navigate(['/conge-form']);
  }

  editLeave(id: string): void {
    this.router.navigate(['/conge-form', id]);
  }

  deleteLeave(id: string): void {
    this.congeService.deleteLeave(id).subscribe({
      next: () => this.conges = this.conges.filter(conge => conge.idC !== id),
      error: () => this.error = 'Failed to delete leave.'
    });
  }
}
