import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { FilterService } from '../../services/filter.service';
import { UF } from '../../types/UF.type';
import { of } from 'rxjs';

describe('EventsComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let filterService = TestBed.inject(FilterService);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        CommonModule,
        NgSelectModule,
        ReactiveFormsModule,
      ],
      providers: [provideHttpClient(), provideRouter(routes), FilterService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    filterService = TestBed.inject(FilterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load locales and update states', () => {
    const mockLocales: UF[] = [
      { id: 1, nome: 'São Paulo', sigla: 'SP' },
      { id: 2, nome: 'Rio de Janeiro', sigla: 'RJ' },
    ];

    spyOn(filterService, 'loadLocales').and.returnValue(of(mockLocales));

    component.loadLocalesFilter();

    expect(filterService.loadLocales).toHaveBeenCalled();
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
});
