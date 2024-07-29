import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Presenter } from '../types/presenter.type';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresenterService {
  private readonly APIurl = `${environment.API}`;

  constructor(private http: HttpClient) {}

  getPresenters(page: number = 0, size: number = 10): Observable<Presenter[]> {
    return this.http
      .get<Presenter[]>(`${this.APIurl}/presenters?page=${page}&size=${size}`)
      .pipe(
        catchError(() => {
          return of([]);
        }),
      );
  }

  createPresenter(presenter: Presenter) {
    return this.http.post(`${this.APIurl}/presenters`, presenter);
  }

  getPresenterById(id: string): Observable<Presenter> {
    return this.http.get<Presenter>(`${this.APIurl}/presenters/${id}`);
  }
}
