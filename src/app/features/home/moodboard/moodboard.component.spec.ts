import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MoodboardComponent } from './moodboard.component';

describe('MoodboardComponent', () => {
  let fixture: ComponentFixture<MoodboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodboardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MoodboardComponent);
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
