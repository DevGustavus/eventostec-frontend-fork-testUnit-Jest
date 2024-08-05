import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';
import { Presenter } from '../../types/presenter.type';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PRESENTER_MOCK, PRESENTERS_MOCK } from '../../../__mocks__/presenters';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, AccordionComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expanded state', () => {
    expect(component.expanded).toBe(false);
    component.toggle();
    expect(component.expanded).toBe(true);
    component.toggle();
    expect(component.expanded).toBe(false);
  });

  it('should emit presenterAdded event and set selectedPresenter', () => {
    const presenter: Presenter = PRESENTER_MOCK;
    component.presenters = [presenter];
    jest.spyOn(component.presenterAdded, 'emit');

    component.addPresenter(presenter);
    expect(component.presenterAdded.emit).toHaveBeenCalledWith(presenter);
    expect(component.selectedPresenter).toBe(presenter);
  });

  it('should not emit presenterAdded event if presenter is not in the list', () => {
    const presenter: Presenter = PRESENTER_MOCK;
    component.presenters = [];
    jest.spyOn(component.presenterAdded, 'emit');

    component.addPresenter(presenter);
    expect(component.presenterAdded.emit).not.toHaveBeenCalled();
    expect(component.selectedPresenter).toBeNull();
  });

  it('should call addPresenter method when button is clicked', () => {
    const presenter: Presenter = PRESENTERS_MOCK[0];
    component.presenters = [presenter];
    jest.spyOn(component, 'addPresenter');

    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'Add Presenter';
    buttonElement.addEventListener('click', () =>
      component.addPresenter(presenter),
    );
    document.body.appendChild(buttonElement);

    buttonElement.click();

    document.body.removeChild(buttonElement);

    expect(component.addPresenter).toHaveBeenCalledWith(presenter);
  });
});
