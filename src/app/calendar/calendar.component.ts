import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, startOfToday, setMonth } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  events: any[] = [];
  eventTitle: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  status: string = '';
  selectedEvent: any = null;
  isEditing: boolean = false;
  months: { name: string, index: number }[] = [
    { name: 'Janvier', index: 0 },
    { name: 'Février', index: 1 },
    { name: 'Mars', index: 2 },
    { name: 'Avril', index: 3 },
    { name: 'Mai', index: 4 },
    { name: 'Juin', index: 5 },
    { name: 'Juillet', index: 6 },
    { name: 'Août', index: 7 },
    { name: 'Septembre', index: 8 },
    { name: 'Octobre', index: 9 },
    { name: 'Novembre', index: 10 },
    { name: 'Décembre', index: 11 }
  ];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  getDaysInMonth(date: Date): Date[] {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  }

  getEventsForDay(day: Date): any[] {
    return this.events.filter(event => 
      new Date(event.startDate).toDateString() === day.toDateString());
  }

  openModal(content: any, day: Date): void {
    this.startDate = day;
    this.endDate = day;
    this.isEditing = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  saveEvent(): void {
    if (this.eventTitle && this.startDate && this.endDate && this.status) {
      this.events.push({
        title: this.eventTitle,
        startDate: this.startDate,
        endDate: this.endDate,
        status: this.status
      });
      this.resetForm();
    }
  }

  editEvent(event: any, content: any): void {
    this.selectedEvent = event;
    this.eventTitle = event.title;
    this.startDate = new Date(event.startDate);
    this.endDate = new Date(event.endDate);
    this.status = event.status;
    this.isEditing = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  updateEvent(): void {
    if (this.eventTitle && this.startDate && this.endDate && this.status && this.selectedEvent) {
      this.selectedEvent.title = this.eventTitle;
      this.selectedEvent.startDate = this.startDate;
      this.selectedEvent.endDate = this.endDate;
      this.selectedEvent.status = this.status;
      this.resetForm();
    }
  }

  deleteEvent(eventToDelete: any): void {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  prevMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  today(): void {
    this.viewDate = startOfToday();
  }

  changeMonth(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const monthIndex = Number(target.value);
    this.viewDate = setMonth(this.viewDate, monthIndex);
  }

  private resetForm(): void {
    this.eventTitle = '';
    this.startDate = null;
    this.endDate = null;
    this.status = '';
    this.selectedEvent = null;
    this.isEditing = false;
  }
}
