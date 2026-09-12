import { type ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let component: HeroComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent, NoopAnimationsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    // Intentionally no detectChanges here — tests need control over lifecycle timing.
  });

  it('ready signal is false before view initialises', () => {
    expect(component.ready()).toBeFalse();
  });

  it('ready signal becomes true 80 ms after ngAfterViewInit', fakeAsync(() => {
    fixture.detectChanges(); // triggers ngAfterViewInit, schedules the setTimeout
    expect(component.ready()).toBeFalse();
    tick(80);
    expect(component.ready()).toBeTrue();
  }));

  it('heroBackdropSrc points to the correct asset path', () => {
    expect(component.heroBackdropSrc).toBe('/assets/hero/hero-backdrop.jpg');
  });
});
