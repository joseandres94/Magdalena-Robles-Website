import { Injectable, signal, computed } from '@angular/core';
import { LOOKS_DATA } from '../../data/collection.data';
import type { Look } from '../models/look.model';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private readonly _looks = signal<Look[]>(LOOKS_DATA);
  private readonly _activeLookIndex = signal<number | null>(null);

  readonly looks = computed(() => this._looks());
  readonly activeLook = computed(() => {
    const idx = this._activeLookIndex();
    return idx !== null ? this._looks()[idx] : null;
  });
  readonly activeLookIndex = computed(() => this._activeLookIndex());
  readonly totalLooks = computed(() => this._looks().length);

  getLookBySlug(slug: string): Look | undefined {
    return this._looks().find((l) => l.slug === slug);
  }

  openLook(index: number): void {
    this._activeLookIndex.set(index);
  }

  closeLook(): void {
    this._activeLookIndex.set(null);
  }

  navigateLook(direction: 1 | -1): void {
    const current = this._activeLookIndex();
    if (current === null) return;
    const next = current + direction;
    const total = this._looks().length;
    if (next >= 0 && next < total) {
      this._activeLookIndex.set(next);
    }
  }
}
