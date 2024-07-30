import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { EventItem } from '../types/Event.type';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly APIurl = `${environment.API}`;

  constructor(private http: HttpClient) {}

  getEvents(page: number = 0, size: number = 10): Observable<EventItem[]> {
    return this.http
      .get<EventItem[]>(`${this.APIurl}/events?page=${page}&size=${size}`)
      .pipe(
        catchError(() => {
          return of([]);
        }),
      );
  }

  getFilteredEvents(
    city: string,
    uf: string,
    startDate: string,
    endDate: string,
    page: number = 0,
  ): Observable<EventItem[]> {
    return this.http
      .get<
        EventItem[]
      >(`${this.APIurl}/events/filter?page=${page}&size=20&city=${city}&uf=${uf}&startDate=${startDate}&endDate=${endDate}`)
      .pipe(
        catchError(() => {
          return of([]);
        }),
      );
  }

  createEvent(event: EventItem) {
    return this.http.post(`${this.APIurl}/events`, event);
  }

  getEventById(id: string): Observable<EventItem> {
    return this.http.get<EventItem>(`${this.APIurl}/events/${id}`);
  }

  updateEvent(eventId: string, updatedEvent: EventItem) {
    return this.http.put(`${this.APIurl}/events/${eventId}`, updatedEvent);
  }
}
