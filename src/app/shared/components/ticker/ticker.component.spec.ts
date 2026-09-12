import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TickerComponent } from './ticker.component';

describe('TickerComponent', () => {
  let fixture: ComponentFixture<TickerComponent>;
  let component: TickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('provides a non-empty default items array', () => {
    expect(component.items.length).toBeGreaterThan(0);
  });

  it('default items include at least one entry with strong styling', () => {
    const hasStrong = component.items.some((item) => item.strong === true);
    expect(hasStrong).toBeTrue();
  });

  it('dark mode defaults to true', () => {
    expect(component.dark).toBeTrue();
  });

  it('accepts custom items via input', () => {
    const custom = [{ text: 'Custom Item' }];
    fixture.componentRef.setInput('items', custom);
    fixture.detectChanges();

    expect(component.items).toEqual(custom);
  });

  it('accepts dark false via input', () => {
    fixture.componentRef.setInput('dark', false);
    fixture.detectChanges();

    expect(component.dark).toBeFalse();
  });
});
