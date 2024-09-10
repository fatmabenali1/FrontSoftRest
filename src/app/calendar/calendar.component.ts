import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Event {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  events: Event[] = [];
  eventTitle: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  status: string = '';
  isEditing: boolean = false;
  eventIdToEdit: number | null = null;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

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

  prevMonth(): void {
    this.viewDate.setMonth(this.viewDate.getMonth() - 1);
    this.viewDate = new Date(this.viewDate); // Refresh the view
  }

  nextMonth(): void {
    this.viewDate.setMonth(this.viewDate.getMonth() + 1);
    this.viewDate = new Date(this.viewDate); // Refresh the view
  }

  goToToday(): void {
    this.viewDate = new Date();
  }

  isDateSelected(day: Date): boolean {
    // Logic to check if a date is selected (can be expanded)
    return false;
  }

  getEventsForDay(day: Date): Event[] {
    return this.events.filter(event => 
      new Date(event.startDate).toDateString() === day.toDateString() || 
      (new Date(event.startDate) <= day && new Date(event.endDate) >= day)
    );
  }

  openModal(content: any, day: Date): void {
    this.startDate = day;
    this.endDate = day;
    this.modalService.open(content);
  }

  saveEvent(): void {
    const newEvent: Event = {
      id: this.events.length + 1,
      title: this.eventTitle,
      startDate: this.startDate!,
      endDate: this.endDate!,
      status: this.status
    };
    this.events.push(newEvent);
    this.modalService.dismissAll();
    this.resetForm();
  }

  editEvent(event: Event, content: any): void {
    this.isEditing = true;
    this.eventTitle = event.title;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.status = event.status;
    this.eventIdToEdit = event.id;
    this.modalService.open(content);
  }

  updateEvent(): void {
    const eventIndex = this.events.findIndex(event => event.id === this.eventIdToEdit);
    if (eventIndex !== -1) {
      this.events[eventIndex] = {
        id: this.eventIdToEdit!,
        title: this.eventTitle,
        startDate: this.startDate!,
        endDate: this.endDate!,
        status: this.status
      };
    }
    this.modalService.dismissAll();
    this.resetForm();
  }

  deleteEvent(event: Event): void {
    this.events = this.events.filter(e => e.id !== event.id);
  }

  isFormValid(): boolean {
    return this.eventTitle && this.startDate && this.endDate && this.status ? true : false;
  }

  resetForm(): void {
    this.eventTitle = '';
    this.startDate = null;
    this.endDate = null;
    this.status = '';
    this.isEditing = false;
    this.eventIdToEdit = null;
  }
}
