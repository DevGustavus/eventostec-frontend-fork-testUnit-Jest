import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { FilterService } from '../../services/filter.service';
import { EventsService } from '../../services/events.service';
import { UF } from '../../types/UF.type';
import { City } from '../../types/City.type';
import { EventItem } from '../../types/Event.type';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let filterService: FilterService;
  let eventsService: EventsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        CommonModule,
        NgSelectModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideHttpClient(),
        provideRouter(routes),
        FilterService,
        EventsService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService);
    eventsService = TestBed.inject(EventsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load locales and update states', () => {
    const mockLocales: UF[] = [
      { id: 1, nome: 'São Paulo', sigla: 'SP' },
      { id: 2, nome: 'Rio de Janeiro', sigla: 'RJ' },
    ];

    const spy = jest
      .spyOn(filterService, 'loadLocales')
      .mockReturnValue(of(mockLocales));

    component.loadLocalesFilter();

    expect(spy).toHaveBeenCalled();
    expect(component.states).toEqual([
      { id: 1, name: 'São Paulo', code: 'SP', label: 'São Paulo', value: 'SP' },
      {
        id: 2,
        name: 'Rio de Janeiro',
        code: 'RJ',
        label: 'Rio de Janeiro',
        value: 'RJ',
      },
    ]);
  });

  it('should toggle the modal visibility', () => {
    expect(component.isModalOpen()).toBeFalsy();
    component.toggleModal();
    expect(component.isModalOpen()).toBeTruthy();
    component.toggleModal();
    expect(component.isModalOpen()).toBeFalsy();
  });

  it('should submit the form and set filter as active', () => {
    const mockFilteredEvents: EventItem[] = [
      {
        id: '1',
        title: 'Event 1',
        remote: false,
        description: '',
        date: '',
        eventUrl: '',
        imgUrl: '',
      },
    ];

    component.filterForm.setValue({
      locale: 'SP',
      city: 'São Paulo',
      from: new Date('2024-01-01'),
      to: new Date('2024-12-31'),
    });

    const spy = jest
      .spyOn(eventsService, 'getFilteredEvents')
      .mockReturnValue(of(mockFilteredEvents));

    component.submit();

    expect(spy).toHaveBeenCalled();
    expect(component.filterIsActive).toBe(true);
    expect(component.isModalOpen()).toBeFalsy();
  });

  it('should not submit if the form is invalid', () => {
    // Mockar o método getFilteredEvents como uma função espiã
    jest.spyOn(eventsService, 'getFilteredEvents');

    // Define valores inválidos para o formulário
    component.filterForm.setValue({
      locale: null, // Campo required vazio
      city: null, // Campo required vazio
      from: null, // Campo required vazio
      to: null, // Campo required vazio
    });

    component.submit();

    // Verifica se o formulário está inválido
    expect(component.filterForm.invalid).toBe(true);

    // Verifica se o método getFilteredEvents não foi chamado
    expect(eventsService.getFilteredEvents).not.toHaveBeenCalled();
  });

  it('should clear the filter and reset the form', () => {
    component.clearFilter();
    expect(component.filterIsActive).toBe(false);
    expect(component.filterForm.pristine).toBe(true);
  });

  it('should load cities when a state is selected', () => {
    const mockCities: City[] = [
      { id: 1, nome: 'São Paulo' },
      { id: 2, nome: 'Campinas' },
    ];

    jest
      .spyOn(filterService, 'loadCitiesByState')
      .mockReturnValue(of(mockCities));

    component.states = [{ id: 1, label: 'São Paulo', value: 'SP' }];
    component.filterForm.patchValue({ locale: 'SP' });
    component.stateSelect2();

    expect(filterService.loadCitiesByState).toHaveBeenCalledWith(1);
    expect(component.cities).toEqual([
      { id: 1, label: 'São Paulo', value: 'São Paulo' },
      { id: 2, label: 'Campinas', value: 'Campinas' },
    ]);
  });

  it('should filter events based on search term', () => {
    const mockEvents: EventItem[] = [
      {
        id: '1',
        title: 'Angular Workshop',
        remote: false,
        description: '',
        date: '',
        eventUrl: '',
        imgUrl: '',
      },
      {
        id: '2',
        title: 'React Conference',
        remote: true,
        description: '',
        date: '',
        eventUrl: '',
        imgUrl: '',
      },
    ];

    const result = component.getFilteredEvents('angular', mockEvents);
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Angular Workshop');
  });

  it('should update search term', () => {
    const spy = jest.spyOn(component.searchTerm, 'next');
    component.updateSearchTerm('new term');
    expect(spy).toHaveBeenCalledWith('new term');
  });

  it('should initialize events$ and filteredEventList$ on ngOnInit', () => {
    const mockEvents: EventItem[] = [
      {
        id: '1',
        title: 'Event 1',
        remote: false,
        description: '',
        date: '',
        eventUrl: '',
        imgUrl: '',
      },
    ];

    jest.spyOn(eventsService, 'getEvents').mockReturnValue(of(mockEvents));
    component.ngOnInit();

    component.filteredEventList$.subscribe((events) => {
      expect(events.length).toBe(1);
      expect(events[0].title).toBe('Event 1');
    });
  });
});
