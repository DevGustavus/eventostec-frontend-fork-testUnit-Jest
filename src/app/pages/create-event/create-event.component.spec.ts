import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEventComponent } from './create-event.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { FilterService } from '../../services/filter.service';
import { PresenterService } from '../../services/presenter.service';
import { Presenter } from '../../types/presenter.type';
import { EventType } from '../../types/Event.type';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CREATE_EVENT_ERROR_RESPONSE_MOCK,
  EVENTS_MOCK,
} from '../../../__mocks__/events';

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let eventsServiceMock: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let filterServiceMock: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let presenterServiceMock: any;

  beforeEach(async () => {
    eventsServiceMock = {
      getEvents: jest.fn().mockReturnValue(of(EVENTS_MOCK)),
      createEvent: jest.fn().mockReturnValue(of({})),
    };
    filterServiceMock = {
      loadLocales: jest
        .fn()
        .mockReturnValue(of([{ id: 1, nome: 'State 1', sigla: 'ST1' }])),
      loadCitiesByState: jest
        .fn()
        .mockReturnValue(of([{ id: 1, nome: 'City 1' }])),
    };
    presenterServiceMock = {
      getPresenters: jest.fn().mockReturnValue(of([{ name: 'Presenter 1' }])),
    };

    await TestBed.configureTestingModule({
      imports: [
        CreateEventComponent,
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule, // Usado para mockar RouterModule e Router
      ],
      providers: [
        provideHttpClient(),
        { provide: EventsService, useValue: eventsServiceMock },
        { provide: FilterService, useValue: filterServiceMock },
        { provide: PresenterService, useValue: presenterServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update todayDate correctly in updateTodayDate method', () => {
    const today = new Date().toISOString().split('T')[0];
    component.updateTodayDate();
    expect(component.todayDate).toBe(today);
  });

  it('should validate date correctly in dateValidator method', () => {
    component.createEventForm.get('date')?.setValue('2030-01-01');
    component.dateValidator();
    expect(component.validDate).toBe(true);

    component.createEventForm.get('date')?.setValue('2000-01-01');
    component.dateValidator();
    expect(component.validDate).toBe(false);
  });

  it('should patch presenter name in onPresenterAdded method', () => {
    const presenter: Presenter = {
      name: 'Test Presenter',
      nickname: '',
      ocupation: '',
      imgUrl: '',
    };
    component.onPresenterAdded(presenter);
    expect(component.createEventForm.get('apresentador')?.value).toBe(
      'Test Presenter',
    );
  });

  it('should call loadPresenters method and populate presenters', () => {
    const presenters: Presenter[] = [
      {
        name: 'Presenter 1',
        nickname: '',
        ocupation: '',
        imgUrl: '',
      },
    ];
    presenterServiceMock.getPresenters.mockReturnValue(of(presenters));
    component.loadPresenters();
    expect(component.presenters.length).toBe(1);
    expect(component.presenters).toEqual(presenters);
  });

  it('should set locale strings correctly in setLocaleAsString method', () => {
    component.states = [{ id: 1, label: 'State 1', value: 'ST1' }];
    component.cities = [{ id: 1, label: 'City 1', value: 'City 1' }];
    component.createEventForm.get('state')?.setValue('1');
    component.createEventForm.get('city')?.setValue('1');
    component.setLocaleAsString();
    expect(component.createEventForm.get('state')?.value).toBe('ST1');
    expect(component.createEventForm.get('city')?.value).toBe('City 1');
  });

  it('should call createEvent method and navigate on success', () => {
    component.createEventForm.get('title')?.setValue('Event Title');
    component.createEventForm.get('description')?.setValue('Event Description');
    component.createEventForm.get('type')?.setValue(EventType.PRESENTIAL);
    component.createEventForm.get('date')?.setValue('2030-01-01');
    component.createEventForm.get('city')?.setValue('1');
    component.createEventForm.get('state')?.setValue('1');
    component.createEventForm.get('apresentador')?.setValue('Presenter 1');

    component.createEvent();
    expect(eventsServiceMock.createEvent).toHaveBeenCalled();
  });

  it('should handle createEvent method error response correctly', () => {
    eventsServiceMock.createEvent.mockReturnValue(
      throwError(() => CREATE_EVENT_ERROR_RESPONSE_MOCK),
    );

    // Preencher o formulário antes de chamar createEvent
    component.createEventForm.get('title')?.setValue('Event Title');
    component.createEventForm.get('description')?.setValue('Event Description');
    component.createEventForm.get('type')?.setValue(EventType.PRESENTIAL);
    component.createEventForm.get('date')?.setValue('2030-01-01');
    component.createEventForm.get('city')?.setValue('1');
    component.createEventForm.get('state')?.setValue('1');
    component.createEventForm.get('apresentador')?.setValue('Presenter 1');

    component.createEvent();
    expect(eventsServiceMock.createEvent).toHaveBeenCalled();
    expect(component.isLoading()).toBe(false);
  });

  it('should call getLocales method and populate states', () => {
    component.getLocales();
    expect(component.states.length).toBe(1);
    expect(component.states[0].value).toBe('ST1');
  });

  it('should call getCities method and populate cities', () => {
    component.getCities(1);
    expect(component.cities.length).toBe(1);
    expect(component.cities[0].label).toBe('City 1');
  });

  it('should handle event type change correctly in handleEventType method', () => {
    component.handleEventType(EventType.ONLINE);
    expect(component.createEventForm.get('type')?.value).toBe(EventType.ONLINE);
    expect(component.createEventForm.get('state')?.value).toBeNull();
    expect(component.createEventForm.get('city')?.value).toBeNull();

    component.handleEventType(EventType.PRESENTIAL);
    expect(component.createEventForm.get('type')?.value).toBe(
      EventType.PRESENTIAL,
    );
  });

  it('should update validators correctly in updateValidators method', () => {
    component.updateValidators(false);
    expect(component.createEventForm.get('state')?.validator).toBeNull();
    expect(component.createEventForm.get('city')?.validator).toBeNull();

    component.updateValidators(true);
    expect(component.createEventForm.get('state')?.validator).not.toBeNull();
    expect(component.createEventForm.get('city')?.validator).not.toBeNull();
  });

  /*
  it('should set file on fileChange event', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as unknown as Event;
    component.fileChange(event);
    expect(component.createEventForm.get('bannerFile')?.value).toBe(file);
  });
  */
});
