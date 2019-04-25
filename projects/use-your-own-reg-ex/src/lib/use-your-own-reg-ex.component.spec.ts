import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseYourOwnRegExComponent } from './use-your-own-reg-ex.component';

describe('UseYourOwnRegExComponent', () => {
  let component: UseYourOwnRegExComponent;
  let fixture: ComponentFixture<UseYourOwnRegExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseYourOwnRegExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseYourOwnRegExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
