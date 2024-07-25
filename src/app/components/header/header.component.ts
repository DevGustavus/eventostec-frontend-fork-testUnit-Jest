import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchTerm: string = '';
  debounceTimeout: ReturnType<typeof setTimeout> | undefined;

  @Input() showSearchBar = true;
  @Input() className: string =
    'mx-auto flex flex-col flex-wrap md:flex-nowrap sm:flex-row sm:gap-x-6 gap-8 max-w-7xl items-center justify-between p-6 lg:px-8';

  @Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  // Sinal para controlar o estado do dropdown
  @Input() isDropdownOpen: WritableSignal<boolean> = signal(false);

  // Evento para notificar o fechamento do dropdown
  @Output() closeDropdown = new EventEmitter<void>();

  // Método para alternar o estado do dropdown
  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  // Método para fechar o dropdown
  close() {
    this.isDropdownOpen.set(false);
    this.closeDropdown.emit();
  }

  onSearchTerm(event: KeyboardEvent) {
    clearTimeout(this.debounceTimeout);
    const target = event.target as HTMLInputElement;

    this.debounceTimeout = setTimeout(() => {
      this.searchTerm = target.value;
      this.searchTermChange.emit(this.searchTerm);
    }, 1000);
  }
}
