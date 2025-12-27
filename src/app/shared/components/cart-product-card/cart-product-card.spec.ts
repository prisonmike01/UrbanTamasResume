import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductCard } from './cart-product-card';

describe('CartProduct', () => {
  let component: CartProductCard;
  let fixture: ComponentFixture<CartProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartProductCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartProductCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
