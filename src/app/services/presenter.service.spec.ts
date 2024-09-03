import { TestBed } from '@angular/core/testing';

import { PresenterService } from './presenter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PresenterService', () => {
  let service: PresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PresenterService],
    });
    service = TestBed.inject(PresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
