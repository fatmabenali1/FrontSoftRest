import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  viewDays: number = 1; // Valeur par défaut ou initialisation
  viewDate: Date = new Date(); // Valeur par défaut ou initialisation
  events: any[] = []; // Initialisation des événements
  locale: string = 'en'; // Valeur par défaut ou initialisation
  selectedDay: Date | null = null; // Date sélectionnée pour les actions d'événement

  constructor() { }

  ngOnInit(): void {
    // Initialisez vos variables ici si nécessaire
  }

  getDaysInMonth(date: Date): Date[] {
    // Retourner un tableau de dates pour le mois en cours
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  }
  
  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }
  
  getEventsForDay(day: Date): any[] {
    // Filtrer les événements pour le jour donné
    return this.events.filter(event => new Date(event.date).toDateString() === day.toDateString());
  }

  viewDaysChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.viewDays = +input.value; // Convertit la chaîne en nombre
  }

  localeChanged(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.locale = select.value;
  }

  goToToday(): void {
    this.viewDate = new Date();
  }

  goToPreviousMonth(): void {
    const newDate = new Date(this.viewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    this.viewDate = newDate;
  }

  goToNextMonth(): void {
    const newDate = new Date(this.viewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    this.viewDate = newDate;
  }

  selectDay(day: Date): void {
    this.selectedDay = day;
  }

  addEvent(day: Date): void {
    const title = prompt("Entrez le titre de l'événement:");
    if (title) {
      this.events.push({ date: day, title });
    }
  }

  updateEvent(day: Date): void {
    const eventsForDay = this.getEventsForDay(day);
    if (eventsForDay.length > 0) {
      const event = eventsForDay[0]; // Pour simplifier, on prend le premier événement
      const newTitle = prompt("Entrez le nouveau titre de l'événement:", event.title);
      if (newTitle) {
        event.title = newTitle;
      }
    } else {
      alert("Aucun événement à mettre à jour pour ce jour.");
    }
  }

  deleteEvent(day: Date): void {
    this.events = this.events.filter(event => new Date(event.date).toDateString() !== day.toDateString());
  }

  eventClicked(action: string, event: any): void {
    // Implémentez la logique pour gérer le clic sur un événement
    if (action === 'view') {
      alert(`Événement: ${event.title}`);
    }
    // Ajoutez d'autres actions possibles si nécessaire
  }
}
