import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EventDetailsComponent } from './event-details.component';
import { EventsService } from './../../services/events.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { CouponsComponent } from '../../components/coupon/coupon.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { EventItem } from '../../types/Event.type';
import { Presenter } from '../../types/presenter.type';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;
  let eventsService: jest.Mocked<EventsService>;

  beforeEach(async () => {
    const eventsServiceMock = {
      getEventById: jest.fn(),
      updateEvent: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HeaderComponent,
        CouponsComponent,
        ModalComponent,
        EventDetailsComponent,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: EventsService, useValue: eventsServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: { params: { id: '123' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    eventsService = TestBed.inject(EventsService) as jest.Mocked<EventsService>;

    const mockEvent: EventItem = {
      id: '123',
      title: 'Sample Event',
      coupons: [],
      remote: false,
      description: 'Sample Event Description',
      date: new Date().toISOString(),
      imgUrl: 'https://example.com/image.jpg',
      eventUrl: 'https://example.com',
      city: 'Sample City',
      state: 'Sample State',
      apresentador: [
        {
          name: 'John Doe',
        },
      ] as Presenter[],
    };

    eventsService.getEventById.mockReturnValue(of(mockEvent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.couponForm).toBeDefined();
    expect(component.couponForm.controls['code'].value).toBe('');
    expect(component.couponForm.controls['discount'].value).toBe(0);
    expect(component.couponForm.controls['validity'].value).toBeNull();
  });

  it('should toggle modal visibility', () => {
    expect(component.isModalOpen()).toBeFalsy();
    component.toggleModal();
    expect(component.isModalOpen()).toBeTruthy();
  });

  it('should submit form and update event', () => {
    component.couponForm.setValue({
      code: 'DISCOUNT10',
      discount: 10,
      validity: new Date('2024-12-31'),
    });

    const updatedEvent: EventItem = {
      id: '123',
      title: 'Sample Event',
      coupons: [
        {
          code: 'DISCOUNT10',
          discount: 10,
          valid: new Date('2024-12-31').toISOString(),
        },
      ],
      remote: false,
      description: 'Sample Event Description',
      date: new Date().toISOString(),
      imgUrl: 'https://example.com/image.jpg',
      eventUrl: 'https://example.com',
      city: 'Sample City',
      state: 'Sample State',
      apresentador: [
        {
          name: 'John Doe',
        },
      ] as Presenter[],
    };

    eventsService.updateEvent.mockReturnValue(of(updatedEvent));

    expect(component.isLoading()).toBeFalsy();

    component.submit();
    fixture.detectChanges();

    console.log('isLoading after submit:', component.isLoading());
    expect(component.isLoading()).toBeTruthy();

    fixture.detectChanges();

    expect(eventsService.updateEvent).toHaveBeenCalledWith(
      '123',
      expect.objectContaining({
        id: '123',
        title: 'Sample Event',
        coupons: updatedEvent.coupons,
        remote: false,
        description: 'Sample Event Description',
        eventUrl: 'https://example.com',
        imgUrl: 'https://example.com/image.jpg',
        city: 'Sample City',
        state: 'Sample State',
        apresentador: [
          {
            name: 'John Doe',
          },
        ],
      }),
    );
    expect(component.isLoading()).toBeFalsy();
  });

  it('should handle form submission errors', () => {
    component.couponForm.setValue({
      code: 'DISCOUNT10',
      discount: 10,
      validity: new Date('2024-12-31'),
    });

    eventsService.updateEvent.mockReturnValue(of(new Error('Error')));

    expect(component.isLoading()).toBeFalsy();

    component.submit();
    fixture.detectChanges();

    console.log('isLoading after submit:', component.isLoading());
    expect(component.isLoading()).toBeTruthy();

    fixture.detectChanges();

    expect(eventsService.updateEvent).toHaveBeenCalled();
    expect(component.isLoading()).toBeFalsy();
  });
});
