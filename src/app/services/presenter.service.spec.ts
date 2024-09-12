import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PresenterService } from './presenter.service';
import { Presenter } from '../types/presenter.type';

describe('PresenterService', () => {
  let service: PresenterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PresenterService],
    });
    service = TestBed.inject(PresenterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve presenters from the API via GET', () => {
    const dummyPresenters: Presenter[] = [
      {
        id: '1',
        name: 'John Doe',
        nickname: 'JD',
        ocupation: 'Expert in AI',
        imgUrl: 'img1.jpg',
      },
      {
        id: '2',
        name: 'Jane Smith',
        nickname: 'JS',
        ocupation: 'Blockchain Specialist',
        imgUrl: 'img2.jpg',
      },
    ];

    service.getPresenters().subscribe((presenters) => {
      expect(presenters.length).toBe(2);
      expect(presenters).toEqual(dummyPresenters);
    });

    const req = httpMock.expectOne(
      `${service['APIurl']}/presenters?page=0&size=10`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyPresenters);
  });

  it('should handle error and return empty array when getPresenters fails', () => {
    service.getPresenters().subscribe((presenters) => {
      expect(presenters.length).toBe(0);
      expect(presenters).toEqual([]);
    });

    const req = httpMock.expectOne(
      `${service['APIurl']}/presenters?page=0&size=10`,
    );
    expect(req.request.method).toBe('GET');
    req.flush('Something went wrong', {
      status: 500,
      statusText: 'Server Error',
    });
  });

  it('should create a new presenter via POST', () => {
    const newPresenter: Presenter = {
      id: '3',
      name: 'Alice Johnson',
      nickname: 'AJ',
      ocupation: 'Web Developer',
      imgUrl: 'img3.jpg',
    };

    service.createPresenter(newPresenter).subscribe((response) => {
      expect(response).toEqual(newPresenter);
    });

    const req = httpMock.expectOne(`${service['APIurl']}/presenters`);
    expect(req.request.method).toBe('POST');
    req.flush(newPresenter);
  });

  it('should retrieve a presenter by ID via GET', () => {
    const dummyPresenter: Presenter = {
      id: '1',
      name: 'John Doe',
      nickname: 'JD',
      ocupation: 'Expert in AI',
      imgUrl: 'img1.jpg',
    };

    service.getPresenterById('1').subscribe((presenter) => {
      expect(presenter).toEqual(dummyPresenter);
    });

    const req = httpMock.expectOne(`${service['APIurl']}/presenters/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPresenter);
  });
});
