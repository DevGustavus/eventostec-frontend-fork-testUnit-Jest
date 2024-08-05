import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let searchInput: HTMLInputElement;
  let searchTermChangeSpy: jest.SpyInstance;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    searchTermChangeSpy = jest.spyOn(component.searchTermChange, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state rendering', () => {
    it('should render title span text', () => {
      const span = fixture.debugElement.query(
        By.css('[data-testid="titleSpan"]'),
      );
      expect(span).toBeTruthy();
      expect(span.nativeElement.textContent.trim()).toEqual('EventosTec');
    });

    it('should render title heading text', () => {
      const h3 = fixture.debugElement.query(
        By.css('[data-testid="titleHeading"]'),
      );
      expect(h3).toBeTruthy();
      expect(h3.nativeElement.textContent.trim()).toEqual(
        'Eventos de Tecnologia 🇧🇷',
      );
    });

    /*
    it('should render add event button text', () => {
      const addEventButton = fixture.debugElement.query(
        By.css('[data-testid="addEventButton"]'),
      );
      expect(addEventButton).toBeTruthy();
      expect(addEventButton.nativeElement.textContent.trim()).toEqual(
        'Adicionar um evento',
      );
    });
    */
  });

  describe('searchTermChange', () => {
    it('should not emit searchTermChange when input event is not a KeyboardEvent', () => {
      component.showSearchBar = true;
      fixture.detectChanges();

      const mockEvent = {
        target: { value: 'test' },
      } as unknown as KeyboardEvent;

      component.onSearchTerm(mockEvent);
      expect(searchTermChangeSpy).not.toHaveBeenCalled();
    });

    it('should emit searchTermChange event after 1000ms delay when input value changes', fakeAsync(() => {
      component.showSearchBar = true;
      fixture.detectChanges();

      searchInput = fixture.debugElement.query(
        By.css('[data-testid="inputSearch"]'),
      ).nativeElement;

      let searchTerm!: string | null | undefined;
      const searchInputValue = 'game';

      component.searchTermChange.pipe(first()).subscribe((text) => {
        searchTerm = text;
      });

      const keyBoardEvent = new KeyboardEvent('keyup', {
        key: searchInputValue,
      });

      searchInput.dispatchEvent(keyBoardEvent);
      searchInput.value = searchInputValue;

      tick(1000);

      expect(searchTerm).toEqual(searchInputValue);
      expect(component.searchTerm).toEqual(searchInputValue);
      expect(searchTermChangeSpy).toHaveBeenCalledWith(searchInputValue);
    }));
  });

  describe('toggleDropdown', () => {
    it('should toggle isDropdownOpen state', () => {
      component.isDropdownOpen.set(false);
      component.toggleDropdown();
      expect(component.isDropdownOpen()).toBe(true);
      component.toggleDropdown();
      expect(component.isDropdownOpen()).toBe(false);
    });
  });

  describe('close', () => {
    it('should set isDropdownOpen to false and emit closeDropdown event', () => {
      const closeDropdownSpy = jest.spyOn(component.closeDropdown, 'emit');
      component.isDropdownOpen.set(true);
      component.close();
      expect(component.isDropdownOpen()).toBe(false);
      expect(closeDropdownSpy).toHaveBeenCalled();
    });
  });
});
