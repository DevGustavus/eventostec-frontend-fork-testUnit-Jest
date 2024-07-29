import { Component, signal, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ModalComponent } from '../../components/modal/modal.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PresenterService } from '../../services/presenter.service';
import { PresenterComponent } from '../../components/presenter/presenter.component';
import { Observable } from 'rxjs';
import { Presenter } from '../../types/presenter.type';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

export interface CreatePresenterFormControl {
  name: FormControl<string | null>;
  nickname: FormControl<string | null>;
  ocupation: FormControl<string | null>;
  imgUrl: FormControl<string | null>;
}

@Component({
  selector: 'app-create-presenter',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    ReactiveFormsModule,
    PresenterComponent,
    RouterModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ModalComponent,
    HeaderComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './create-presenter.component.html',
  styleUrl: './create-presenter.component.scss',
})
export class CreatePresenterComponent implements OnInit {
  presenterService = inject(PresenterService);
  isModalOpen = signal(false);
  filterIsActive = false;
  isOnline: boolean = false;
  createPresenterForm!: FormGroup<CreatePresenterFormControl>;
  presentersList!: Observable<Presenter[]>;

  isLoading = signal(false);

  ngOnInit() {
    this.createPresenterForm = new FormGroup<CreatePresenterFormControl>({
      name: new FormControl(null, [Validators.required]),
      nickname: new FormControl(null, Validators.required),
      ocupation: new FormControl(null, [Validators.required]),
      imgUrl: new FormControl(null, [Validators.required]),
    });
    this.presentersList = this.presenterService.getPresenters();
  }

  toggleModal() {
    this.isModalOpen.update((value) => !value);
  }

  createPresenter() {
    this.isLoading.set(true);

    if (!this.createPresenterForm?.valid) {
      return;
    }

    // Criando um objeto a partir dos valores do formulário
    const presenterData = {
      name: this.createPresenterForm.get('name')?.value ?? '',
      nickname: this.createPresenterForm.get('nickname')?.value ?? '',
      ocupation: this.createPresenterForm.get('ocupation')?.value ?? '',
      imgUrl: this.createPresenterForm.get('imgUrl')?.value ?? '',
    };

    this.presenterService.createPresenter(presenterData).subscribe({
      next: (response) => {
        this.isLoading.set(true);
        console.log('Apresentador criado com sucesso', response);
        this.toggleModal();
        this.createPresenterForm.reset();
      },
      error: (error) => {
        console.error('Erro ao criar apresentador', error);
      },
    });
  }
}
