import { TestBed } from '@angular/core/testing';
import { CollectionService } from './collection.service';
import { LOOKS_DATA } from '../../data/collection.data';

describe('CollectionService', () => {
  let service: CollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionService);
  });

  describe('initial state', () => {
    it('loads all looks from LOOKS_DATA', () => {
      expect(service.looks().length).toBe(LOOKS_DATA.length);
    });

    it('activeLook is null', () => {
      expect(service.activeLook()).toBeNull();
    });

    it('activeLookIndex is null', () => {
      expect(service.activeLookIndex()).toBeNull();
    });

    it('totalLooks equals the number of looks in LOOKS_DATA', () => {
      expect(service.totalLooks()).toBe(LOOKS_DATA.length);
    });
  });

  describe('getLookBySlug()', () => {
    it('returns the look matching the given slug', () => {
      const look = service.getLookBySlug('pedrolino');

      expect(look).toBeDefined();
      expect(look?.name).toBe('Pedrolino');
    });

    it('returns undefined for an unknown slug', () => {
      expect(service.getLookBySlug('unknown-slug')).toBeUndefined();
    });
  });

  describe('openLook()', () => {
    it('sets activeLookIndex to the given index', () => {
      service.openLook(2);

      expect(service.activeLookIndex()).toBe(2);
    });

    it('activeLook returns the look at the opened index', () => {
      service.openLook(2);

      expect(service.activeLook()).toEqual(LOOKS_DATA[2]);
    });
  });

  describe('closeLook()', () => {
    it('resets activeLookIndex to null', () => {
      service.openLook(1);
      service.closeLook();

      expect(service.activeLookIndex()).toBeNull();
    });

    it('activeLook returns null after closing', () => {
      service.openLook(1);
      service.closeLook();

      expect(service.activeLook()).toBeNull();
    });
  });

  describe('navigateLook()', () => {
    it('advances to the next look', () => {
      service.openLook(1);
      service.navigateLook(1);

      expect(service.activeLookIndex()).toBe(2);
    });

    it('goes back to the previous look', () => {
      service.openLook(2);
      service.navigateLook(-1);

      expect(service.activeLookIndex()).toBe(1);
    });

    it('does not navigate below index 0', () => {
      service.openLook(0);
      service.navigateLook(-1);

      expect(service.activeLookIndex()).toBe(0);
    });

    it('does not navigate past the last look', () => {
      const lastIndex = LOOKS_DATA.length - 1;
      service.openLook(lastIndex);
      service.navigateLook(1);

      expect(service.activeLookIndex()).toBe(lastIndex);
    });

    it('does nothing when no look is active', () => {
      service.navigateLook(1);

      expect(service.activeLookIndex()).toBeNull();
    });
  });
});
