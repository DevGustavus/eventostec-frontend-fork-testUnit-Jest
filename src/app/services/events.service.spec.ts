import { TestBed, waitForAsync } from '@angular/core/testing';
import { EventsService } from './events.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EventItem } from '../types/Event.type';
import {
  CREATE_EVENT_ERROR_RESPONSE_MOCK,
  EVENT_MOCK,
} from '../../__mocks__/events';
import { HttpErrorResponse } from '@angular/common/http';

describe('EventsService', () => {
  let eventsService: EventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventsService],
    });
    eventsService = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(eventsService).toBeTruthy();
  });

  describe('getEvents', () => {
    it('should return a list of events', () => {
      let events: EventItem[] | undefined;
      eventsService.getEvents().subscribe((body) => {
        events = body;
      });

      const req = httpMock.expectOne(
        'http://localhost:3000/events?page=0&size=10',
      );
      req.flush([EVENT_MOCK]);

      expect(events).toEqual([EVENT_MOCK]);
      expect(req.request.method).toEqual('GET');
    });

    it('should return a list of events using waitForAsync', waitForAsync(() => {
      eventsService.getEvents().subscribe((response) => {
        expect(response).toEqual([EVENT_MOCK]);
      });
      const req = httpMock.expectOne(
        'http://localhost:3000/events?page=0&size=10',
      );

      req.flush([EVENT_MOCK]);
      expect(req.request.method).toEqual('GET');
    }));
  });

  describe('getEventsById', () => {
    it('should return an event', () => {
      let event: EventItem | null = null;
      eventsService.getEventById(EVENT_MOCK.id!).subscribe((body) => {
        event = body;
      });

      const req = httpMock.expectOne('http://localhost:3000/events/1');
      req.flush(EVENT_MOCK);

      expect(event).toEqual(EVENT_MOCK);
      expect(req.request.method).toEqual('GET');
    });

    it('should return an event using waitForAsync', waitForAsync(() => {
      eventsService.getEventById(EVENT_MOCK.id!).subscribe((response) => {
        expect(response).toEqual(EVENT_MOCK);
      });

      const req = httpMock.expectOne('http://localhost:3000/events/1');

      req.flush(EVENT_MOCK);
      expect(req.request.method).toEqual('GET');
    }));
  });

  describe('createEvent', () => {
    it('should create an event', () => {
      let event: EventItem | undefined | unknown;
      eventsService.createEvent(EVENT_MOCK).subscribe((response) => {
        event = response;
      });
      const req = httpMock.expectOne('http://localhost:3000/events');

      req.flush(EVENT_MOCK);

      expect(event).toEqual(EVENT_MOCK);
      expect(req.request.method).toEqual('POST');
    });

    it('passes the correct body', () => {
      eventsService.createEvent(EVENT_MOCK).subscribe();
      const req = httpMock.expectOne('http://localhost:3000/events');

      req.flush(EVENT_MOCK);

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(EVENT_MOCK);
    });

    it('throws an error if request fails', () => {
      let httpErrorResponse: HttpErrorResponse | undefined;
      eventsService.createEvent(EVENT_MOCK).subscribe({
        next: () => {
          fail('Failed to create a new event!');
        },
        error: (error) => (httpErrorResponse = error),
      });
      const req = httpMock.expectOne('http://localhost:3000/events');
      req.flush('Server error', CREATE_EVENT_ERROR_RESPONSE_MOCK);

      if (!httpErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httpErrorResponse.status).toEqual(422);
      expect(httpErrorResponse.statusText).toEqual('Unprocessible entity');
    });
  });

  // Implementação dos testes para getFilteredEvents
  describe('getFilteredEvents', () => {
    it('should return a filtered list of events', () => {
      let events: EventItem[] | undefined;
      eventsService
        .getFilteredEvents('Angra dos Reis', 'RJ', '2025-12-01', '2025-12-31')
        .subscribe((body) => {
          events = body;
        });

      const req = httpMock.expectOne(
        'http://localhost:3000/events/filter?page=0&size=20&city=Angra dos Reis&uf=RJ&startDate=2025-12-01&endDate=2025-12-31',
      );
      req.flush([EVENT_MOCK]);

      expect(events).toEqual([EVENT_MOCK]);
      expect(req.request.method).toEqual('GET');
    });

    it('should return an empty list when the request fails', () => {
      let events: EventItem[] | undefined;
      eventsService
        .getFilteredEvents('Angra dos Reis', 'RJ', '2025-12-01', '2025-12-31')
        .subscribe((body) => {
          events = body;
        });

      const req = httpMock.expectOne(
        'http://localhost:3000/events/filter?page=0&size=20&city=Angra dos Reis&uf=RJ&startDate=2025-12-01&endDate=2025-12-31',
      );
      req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

      expect(events).toEqual([]);
    });
  });

  // Implementação dos testes para updateEvent
  describe('updateEvent', () => {
    it('should update an event', () => {
      eventsService.updateEvent(EVENT_MOCK.id!, EVENT_MOCK).subscribe();
      const req = httpMock.expectOne(
        `http://localhost:3000/events/${EVENT_MOCK.id}`,
      );

      req.flush(null);

      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(EVENT_MOCK);
    });

    it('should throw an error if update fails', () => {
      let httpErrorResponse: HttpErrorResponse | undefined;
      eventsService.updateEvent(EVENT_MOCK.id!, EVENT_MOCK).subscribe({
        next: () => {
          fail('Failed to update the event!');
        },
        error: (error) => (httpErrorResponse = error),
      });
      const req = httpMock.expectOne(
        `http://localhost:3000/events/${EVENT_MOCK.id}`,
      );
      req.flush('Server error', CREATE_EVENT_ERROR_RESPONSE_MOCK);

      if (!httpErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httpErrorResponse.status).toEqual(422);
      expect(httpErrorResponse.statusText).toEqual('Unprocessible entity');
    });
  });
});
