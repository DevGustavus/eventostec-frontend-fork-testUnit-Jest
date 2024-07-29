import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CouponsComponent } from '../../components/coupon/coupon.component';
import { PresenterService } from '../../services/presenter.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-presenter-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CouponsComponent],
  templateUrl: './presenter-details.component.html',
  styleUrl: './presenter-details.component.scss',
})
export class PresenterDetailsComponent {
  constructor(
    private presenterService: PresenterService,
    private route: ActivatedRoute,
  ) {}

  presenter = this.route.params.pipe(
    switchMap((params) => this.presenterService.getPresenterById(params['id'])),
  );
}
