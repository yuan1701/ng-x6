import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenctilComponent } from './senctil.component';

describe('SenctilComponent', () => {
  let component: SenctilComponent;
  let fixture: ComponentFixture<SenctilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenctilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenctilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
