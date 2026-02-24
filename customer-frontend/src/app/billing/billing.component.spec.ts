import { ComponentFixture, TestBed } from '@angular/core/testing';

import { billingComponent } from './billing.component';

describe('CustomerOffer', () => {
  let component: billingComponent;
  let fixture: ComponentFixture<billingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [billingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(billingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
