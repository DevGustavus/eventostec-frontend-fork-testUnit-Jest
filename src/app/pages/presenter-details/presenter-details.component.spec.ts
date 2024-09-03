import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PresenterDetailsComponent } from './presenter-details.component';
import { PresenterService } from '../../services/presenter.service';

describe('PresenterDetailsComponent', () => {
  let component: PresenterDetailsComponent;
  let fixture: ComponentFixture<PresenterDetailsComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let presenterServiceMock: any;

  beforeEach(async () => {
    presenterServiceMock = {
      getPresenterById: jest
        .fn()
        .mockReturnValue(of({ id: '1', name: 'Test Presenter' })),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PresenterDetailsComponent],
      providers: [
        { provide: PresenterService, useValue: presenterServiceMock },
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PresenterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
