import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingBoardComponentComponent } from './booking-board-component.component';

describe('BookingBoardComponentComponent', () => {
  let component: BookingBoardComponentComponent;
  let fixture: ComponentFixture<BookingBoardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingBoardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingBoardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
