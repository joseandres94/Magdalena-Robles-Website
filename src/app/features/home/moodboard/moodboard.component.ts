import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mr-moodboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './moodboard.component.html',
  styleUrl: './moodboard.component.scss',
})
export class MoodboardComponent {}
