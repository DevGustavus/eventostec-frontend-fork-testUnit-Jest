import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePresenterComponent } from './create-presenter.component';

describe('CreatePresenterComponent', () => {
  let component: CreatePresenterComponent;
  let fixture: ComponentFixture<CreatePresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePresenterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
