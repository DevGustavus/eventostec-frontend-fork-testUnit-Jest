import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'eventos',
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/event-details/event-details.component').then(
            (c) => c.EventDetailsComponent,
          ),
      },
    ],
  },
  {
    path: 'criar-evento',
    loadComponent: () =>
      import('./pages/create-event/create-event.component').then(
        (c) => c.CreateEventComponent,
      ),
  },
  {
    path: 'criar-apresentador',
    loadComponent: () =>
      import('./pages/create-presenter/create-presenter.component').then(
        (c) => c.CreatePresenterComponent,
      ),
  },
  {
    path: 'apresentador',
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/presenter-details/presenter-details.component').then(
            (c) => c.PresenterDetailsComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'eventos' },
];
