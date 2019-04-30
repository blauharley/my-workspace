import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoptypeComponent } from './shoptype.component';

describe('ShoptypeComponent', () => {
  let component: ShoptypeComponent;
  let fixture: ComponentFixture<ShoptypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoptypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
