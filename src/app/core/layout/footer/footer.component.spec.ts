import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { BRAND_INFO } from '../../../data/brand.data';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('year equals the current calendar year', () => {
    expect(component.year).toBe(new Date().getFullYear());
  });

  it('brand references the BRAND_INFO constant', () => {
    expect(component.brand).toBe(BRAND_INFO);
  });
});
