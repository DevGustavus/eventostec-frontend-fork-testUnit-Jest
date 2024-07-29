import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenterDetailsComponent } from './presenter-details.component';

describe('PresenterDetailsComponent', () => {
  let component: PresenterDetailsComponent;
  let fixture: ComponentFixture<PresenterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresenterDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PresenterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
