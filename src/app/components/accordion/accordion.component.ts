import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Presenter } from '../../types/presenter.type';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  @Input() presenters: Presenter[] = [];
  @Output() presenterAdded = new EventEmitter<Presenter>();
  selectedPresenter: Presenter | null = null;
  expanded: boolean = false;

  toggle() {
    this.expanded = !this.expanded;
  }

  addPresenter(presenter: Presenter) {
    if (this.presenters.includes(presenter)) {
      this.presenterAdded.emit(presenter);
      this.selectedPresenter = presenter;
      console.log('presenter: ' + this.selectedPresenter?.name);
    }
  }
}
