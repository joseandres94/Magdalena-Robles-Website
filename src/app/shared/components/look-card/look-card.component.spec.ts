import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LookCardComponent } from './look-card.component';
import type { Look } from '../../../core/models/look.model';
import { MOCK_LOOK } from '../../../../testing/test-fixtures';

describe('LookCardComponent', () => {
  let fixture: ComponentFixture<LookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LookCardComponent);
    fixture.componentRef.setInput('look', MOCK_LOOK);
    fixture.detectChanges();
  });

  it('opens quick view for the clicked look', () => {
    let emitted: Look | undefined;
    fixture.componentInstance.cardClick.subscribe((look) => (emitted = look));

    (fixture.nativeElement as HTMLElement)
      .querySelector<HTMLButtonElement>('.look-trigger')
      ?.click();

    expect(emitted).toEqual(MOCK_LOOK);
  });
});
