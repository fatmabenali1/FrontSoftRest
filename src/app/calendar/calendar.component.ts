import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, startOfToday } from 'date-fns';

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
      this.eventTitle = '';
      this.startDate = null;
      this.endDate = null;
      this.status = '';
    }
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
}
