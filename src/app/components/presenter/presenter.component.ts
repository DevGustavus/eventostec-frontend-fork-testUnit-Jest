import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-presenter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './presenter.component.html',
  styleUrl: './presenter.component.scss',
})
export class PresenterComponent {
  @Input() name: string = '';
  @Input() nickname: string = '';
  @Input() ocupation: string = '';
  @Input() imgUrl: string = '';
}
