import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeetsComponent } from './deets.component';

describe('DeetsComponent', () => {
  let component: DeetsComponent;
  let fixture: ComponentFixture<DeetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
