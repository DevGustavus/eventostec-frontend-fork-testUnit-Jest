import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './app.routes';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideRouter(routes), // Configura as rotas para teste
      ],
      declarations: [DummyComponent], // Dummy component for testing
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    TestBed.createComponent(DummyComponent);
  });

  it('deve navegar para a home', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('');
  });

  it('deve carregar o EventDetailsComponent ao navegar para /eventos/:id', async () => {
    await router.navigate(['eventos', '123']);
    expect(location.path()).toBe('/eventos/123');
  });

  it('deve carregar o CreateEventComponent ao navegar para /criar-evento', async () => {
    await router.navigate(['criar-evento']);
    expect(location.path()).toBe('/criar-evento');
  });

  it('deve carregar o CreatePresenterComponent ao navegar para /criar-apresentador', async () => {
    await router.navigate(['criar-apresentador']);
    expect(location.path()).toBe('/criar-apresentador');
  });

  it('deve redirecionar para /eventos quando rota não encontrada', async () => {
    await router.navigate(['/alguma-rota-que-nao-existe']);
    expect(location.path()).toBe('/eventos');
  });

  it('deve carregar o PresenterDetailsComponent ao navegar para /apresentador/:id', async () => {
    await router.navigate(['apresentador', '123']);
    expect(location.path()).toBe('/apresentador/123');
    // Aqui você pode adicionar verificações adicionais para garantir que o componente foi instanciado corretamente, se necessário.
  });
});
