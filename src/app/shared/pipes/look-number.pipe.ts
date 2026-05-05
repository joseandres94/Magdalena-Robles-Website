import { Pipe, PipeTransform } from '@angular/core';

/** Formats a look number as "Look 01", "Look 02" etc. */
@Pipe({ name: 'lookNumber', standalone: true })
export class LookNumberPipe implements PipeTransform {
  transform(value: number): string {
    return `Look ${String(value).padStart(2, '0')}`;
  }
}
