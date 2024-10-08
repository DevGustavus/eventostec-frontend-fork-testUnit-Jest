import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { switchMap } from 'rxjs';
import { EventsService } from './../../services/events.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { CouponsComponent } from '../../components/coupon/coupon.component';
import { ModalComponent } from '../../components/modal/modal.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CouponService } from '../../services/coupon.service';

interface CouponForm {
  code: FormControl<string | null>;
  discount: FormControl<number | null>;
  validity: FormControl<Date | null>;
}

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CouponsComponent,
    ModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent {
  isModalOpen = signal(false);
  isLoading = signal(false);
  couponForm!: FormGroup<CouponForm>;
  mask = [{ mask: '9,99%' }, { mask: '99,99%' }];

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private couponService: CouponService,
  ) {
    this.couponForm = new FormGroup<CouponForm>({
      code: new FormControl<string | null>('', [Validators.required]),
      discount: new FormControl<number | null>(0, [Validators.required]),
      validity: new FormControl<Date | null>(null, [Validators.required]),
    });
  }

  event$ = this.route.params.pipe(
    switchMap((params) => this.eventsService.getEventById(params['id'])),
  );

  toggleModal() {
    this.isModalOpen.set(!this.isModalOpen());
  }

  submit() {
    this.isLoading.set(true);

    if (this.couponForm.valid) {
      const newCoupon = {
        code: this.couponForm.value?.code || '',
        discount: this.couponForm.value?.discount || 0,
        valid: new Date(
          this.couponForm.value?.validity?.toString() || '',
        ).toISOString(),
      };

      const eventId = this.route.snapshot.params['id'];

      // Obter o evento atual
      this.eventsService.getEventById(eventId).subscribe({
        next: (event) => {
          // Adicionar o novo cupom ao array de cupons existente
          const updatedCoupons = event.coupons
            ? [...event.coupons, newCoupon]
            : [newCoupon];
          const updatedEvent = { ...event, coupons: updatedCoupons };

          // Atualizar o evento com o novo array de cupons
          this.eventsService.updateEvent(eventId, updatedEvent).subscribe({
            next: () => {
              this.event$ = this.route.params.pipe(
                switchMap((params) =>
                  this.eventsService.getEventById(params['id']),
                ),
              );
              this.isLoading.set(false);
              this.toggleModal();
            },
            error: (error) => {
              this.isLoading.set(false);
              console.error('Erro ao atualizar evento:', error);
            },
          });
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Erro ao recuperar evento:', error);
        },
      });
    }
  }
}
