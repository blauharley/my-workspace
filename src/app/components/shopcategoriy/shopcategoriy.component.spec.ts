import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopcategoriyComponent } from './shopcategoriy.component';

describe('ShopcategoriyComponent', () => {
  let component: ShopcategoriyComponent;
  let fixture: ComponentFixture<ShopcategoriyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopcategoriyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopcategoriyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
