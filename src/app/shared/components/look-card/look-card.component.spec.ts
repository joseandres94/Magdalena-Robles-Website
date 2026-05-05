import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { LookCardComponent } from './look-card.component';
import type { Look } from '../../../core/models/look.model';
import { MOCK_LOOK, MOCK_LOOK_LAST } from '../../../../testing/test-fixtures';

describe('LookCardComponent', () => {
  let fixture: ComponentFixture<LookCardComponent>;
  let component: LookCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LookCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('look', MOCK_LOOK);
    fixture.detectChanges();
  });

  it('accepts a Look as required input', () => {
    expect(component.look).toEqual(MOCK_LOOK);
  });

  it('accepts a boundary Look fixture as input', () => {
    fixture.componentRef.setInput('look', MOCK_LOOK_LAST);
    fixture.detectChanges();

    expect(component.look).toEqual(MOCK_LOOK_LAST);
  });

  it('index defaults to 0', () => {
    expect(component.index).toBe(0);
  });

  it('cardClick emits the provided look', () => {
    let emitted: Look | undefined;
    component.cardClick.subscribe((look) => (emitted = look));

    component.cardClick.emit(MOCK_LOOK);

    expect(emitted).toEqual(MOCK_LOOK);
  });
});
