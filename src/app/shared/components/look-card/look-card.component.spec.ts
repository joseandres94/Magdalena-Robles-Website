import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LookCardComponent } from './look-card.component';
import { LOOKS_DATA } from '../../../data/collection.data';
import type { Look } from '../../../core/models/look.model';

describe('LookCardComponent', () => {
  let fixture: ComponentFixture<LookCardComponent>;
  let component: LookCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LookCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('look', LOOKS_DATA[0]);
    fixture.detectChanges();
  });

  it('accepts a Look as required input', () => {
    expect(component.look).toEqual(LOOKS_DATA[0]);
  });

  it('index defaults to 0', () => {
    expect(component.index).toBe(0);
  });

  it('cardClick emits the provided look', () => {
    let emitted: Look | undefined;
    component.cardClick.subscribe((look) => (emitted = look));

    component.cardClick.emit(LOOKS_DATA[0]);

    expect(emitted).toEqual(LOOKS_DATA[0]);
  });
});
