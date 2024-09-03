import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePresenterComponent } from './create-presenter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PresenterService } from '../../services/presenter.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CreatePresenterComponent', () => {
  let component: CreatePresenterComponent;
  let fixture: ComponentFixture<CreatePresenterComponent>;
  let presenterService: PresenterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        CreatePresenterComponent,
      ],
      providers: [
        PresenterService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePresenterComponent);
    component = fixture.componentInstance;
    presenterService = TestBed.inject(PresenterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.createPresenterForm.valid).toBeFalsy();
  });

  it('should have a valid form when all required fields are filled', () => {
    component.createPresenterForm.controls['name'].setValue('Gustavo');
    component.createPresenterForm.controls['nickname'].setValue('DevGustavus');
    component.createPresenterForm.controls['ocupation'].setValue(
      'Desenvolvedor',
    );
    component.createPresenterForm.controls['imgUrl'].setValue(
      'http://image.url',
    );

    expect(component.createPresenterForm.valid).toBeTruthy();
  });

  it('should toggle modal state', () => {
    expect(component.isModalOpen()).toBeFalsy();
    component.toggleModal();
    expect(component.isModalOpen()).toBeTruthy();
    component.toggleModal();
    expect(component.isModalOpen()).toBeFalsy();
  });

  it('should call createPresenter on submit with valid form', () => {
    const spy = jest
      .spyOn(presenterService, 'createPresenter')
      .mockReturnValue(of({}));

    component.createPresenterForm.controls['name'].setValue('Gustavo');
    component.createPresenterForm.controls['nickname'].setValue('DevGustavus');
    component.createPresenterForm.controls['ocupation'].setValue(
      'Desenvolvedor',
    );
    component.createPresenterForm.controls['imgUrl'].setValue(
      'http://image.url',
    );

    component.createPresenter();

    expect(spy).toHaveBeenCalled();
    expect(component.isLoading()).toBeTruthy();
  });

  it('should not call createPresenter on submit with invalid form', () => {
    const spy = jest
      .spyOn(presenterService, 'createPresenter')
      .mockReturnValue(of({}));

    component.createPresenter();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should reset the form and close modal on successful create', () => {
    jest.spyOn(presenterService, 'createPresenter').mockReturnValue(of({}));
    const resetSpy = jest.spyOn(component.createPresenterForm, 'reset');
    const toggleModalSpy = jest.spyOn(component, 'toggleModal');

    component.createPresenterForm.controls['name'].setValue('Gustavo');
    component.createPresenterForm.controls['nickname'].setValue('DevGustavus');
    component.createPresenterForm.controls['ocupation'].setValue(
      'Desenvolvedor',
    );
    component.createPresenterForm.controls['imgUrl'].setValue(
      'http://image.url',
    );

    component.createPresenter();

    expect(resetSpy).toHaveBeenCalled();
    expect(toggleModalSpy).toHaveBeenCalled();
    expect(component.isLoading()).toBeTruthy();
  });
});
