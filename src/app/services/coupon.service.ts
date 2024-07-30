import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
//import { EventItem } from '../types/Event.type';
import { Coupon } from '../types/Coupon.type';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private readonly APIurl = `${environment.API}`;

  constructor(private http: HttpClient) {}

  /*
  addCoupon(data: Coupon, eventId: string) {
    return this.http.post(`${this.APIurl}/events/${eventId}/coupons`, data);
  }
  */
  /*
  createCoupon(coupon: Coupon, eventId: string): Observable<unknown> {
    return this.http.patch(`${this.APIurl}/events/${eventId}`, coupon);
  }
  */

  updateCoupon(coupon: Coupon, eventId: string) {
    return this.http.put(`${this.APIurl}/events/${eventId}`, coupon);
  }
}
