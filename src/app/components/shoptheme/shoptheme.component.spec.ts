import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopthemeComponent } from './shoptheme.component';

describe('ShopthemeComponent', () => {
  let component: ShopthemeComponent;
  let fixture: ComponentFixture<ShopthemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopthemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopthemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
