import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CongeService } from '../services/conge.service';
import { Conge } from '../models/conge';
import { Status } from '../status';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  events: Conge[] = [];
  eventTitle: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  reason: string = '';
  isEditing: boolean = false;
  eventIdToEdit: string | null = null;

  constructor(private modalService: NgbModal, private congeService: CongeService) {}
  conges: Conge[] = [];

  ngOnInit(): void {
    this.getConges();
  }

  getConges(): void {
    this.congeService.getConges().subscribe(
      (conges: Conge[]) => this.events = conges,
      (error) => console.error('Erreur lors du chargement des congés', error)
    );
  }

  prevMonth(): void {
    this.viewDate.setMonth(this.viewDate.getMonth() - 1);
    this.viewDate = new Date(this.viewDate);
  }

  nextMonth(): void {
    this.viewDate.setMonth(this.viewDate.getMonth() + 1);
    this.viewDate = new Date(this.viewDate);
  }

  goToToday(): void {
    this.viewDate = new Date();
  }

  getDaysInMonth(date: Date): Date[] {
    const days: Date[] = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= numDays; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }

  isDateSelected(day: Date): boolean {
    return false; // Ajustez selon la logique de sélection
  }

  getEventsForDay(day: Date): Conge[] {
    return this.events.filter(event =>
      new Date(event.dateDebut).toDateString() === day.toDateString() ||
      (new Date(event.dateDebut) <= day && new Date(event.dateFin) >= day)
    );
  }

  openModal(content: any, day: Date): void {
    this.startDate = day;
    this.endDate = day;
    this.modalService.open(content);
    console.log(day);
  }

  addConge(): void {
    if (!this.isFormValid()) {
      console.error('Formulaire invalide');
      return;
    }

    const newConge: any = {
      dateDebut: this.startDate!,
      dateFin: this.endDate!,
      reason: this.reason,
      dateValidation: new Date(), // Date actuelle pour validation
      title: this.eventTitle ,
      status:Status.PENDING
    };

    this.congeService.addConge(newConge).subscribe(
      (conge: Conge) => {
        this.events.push(conge);
        this.modalService.dismissAll();
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du congé', error);
        alert('Erreur lors de l\'ajout du congé');
      }
    );
  }

  editConge(event: Conge, content: any): void {
    this.isEditing = true;
    this.eventTitle = event.title || ''; // Utilisez le titre de l'événement
    this.startDate = event.dateDebut;
    this.endDate = event.dateFin;
    this.reason = event.reason;
    this.eventIdToEdit = event.idC;
    this.modalService.open(content);
  }

  updateConge(): void {
    if (!this.isFormValid()) {
      console.error('Formulaire invalide');
      return;
    }

    const updatedConge: Conge = {
      idC: this.eventIdToEdit!,
      dateDebut: this.startDate!,
      dateFin: this.endDate!,
      reason: this.reason,
      status: Status.PENDING,
      dateValidation: new Date(),
      title: this.eventTitle // Ajoutez le titre
    };

    this.congeService.updateConge(this.eventIdToEdit!, updatedConge).subscribe(
      (conge: Conge) => {
        const index = this.events.findIndex(event => event.idC === this.eventIdToEdit);
        if (index !== -1) {
          this.events[index] = conge;
        }
        this.modalService.dismissAll();
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du congé', error);
        alert('Erreur lors de la mise à jour du congé');
      }
    );
  }

  deleteConge(event: Conge): void {
    console.log(event);
    this.congeService.deleteConge(event.idC).subscribe(
      () => {
        this.events = this.events.filter(e => e.idC !== event.idC);
      },
      (error) => {
        console.error('Erreur lors de la suppression du congé', error);
        alert('Erreur lors de la suppression du congé');
      }
    );
  }

  isFormValid(): boolean {
    return this.startDate !== null && this.endDate !== null && this.reason?.trim() !== '' && this.eventTitle?.trim() !== '';
  }

  resetForm(): void {
    this.eventTitle = '';
    this.startDate = null;
    this.endDate = null;
    this.reason = '';
    this.isEditing = false;
    this.eventIdToEdit = null;
  }
}
