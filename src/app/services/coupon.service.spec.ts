import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CouponService } from './coupon.service';
import { Coupon } from '../types/Coupon.type';

describe('CouponService', () => {
  let service: CouponService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CouponService],
    });
    service = TestBed.inject(CouponService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update a coupon for an event', () => {
    const mockCoupon: Coupon = {
      code: 'DISCOUNT10',
      discount: 10,
      valid: new Date('2024-12-31').toISOString(),
    };

    const eventId = '123';

    service.updateCoupon(mockCoupon, eventId).subscribe();

    const req = httpMock.expectOne(`${service['APIurl']}/events/${eventId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCoupon);

    req.flush(null);
  });

  it('should handle error when updating a coupon', () => {
    const mockCoupon: Coupon = {
      code: 'DISCOUNT10',
      discount: 10,
      valid: new Date('2024-12-31').toISOString(),
    };

    const eventId = '123';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorResponse: any;
    service.updateCoupon(mockCoupon, eventId).subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (error) => {
        errorResponse = error;
      },
    });

    const req = httpMock.expectOne(`${service['APIurl']}/events/${eventId}`);
    req.flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error',
    });

    expect(errorResponse.status).toBe(500);
  });
});
