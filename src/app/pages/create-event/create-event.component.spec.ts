import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventComponent } from './create-event.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEventComponent, CommonModule, ReactiveFormsModule],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update todayDate correctly in updateTodayDate method', () => {
    const today = new Date().toISOString().split('T')[0];
    component.updateTodayDate();
    expect(component.todayDate).toBe(today);
  });

  it('should update todayDate correctly in updateTodayDate method', () => {
    const today = new Date().toISOString().split('T')[0];
    component.updateTodayDate();
    expect(component.todayDate).toBe(today);
  });
});
