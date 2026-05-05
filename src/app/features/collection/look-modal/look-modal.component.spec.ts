import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LookModalComponent } from './look-modal.component';
import { MOCK_LOOK } from '../../../../testing/test-fixtures';

describe('LookModalComponent', () => {
  let fixture: ComponentFixture<LookModalComponent>;
  let component: LookModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookModalComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LookModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('look', MOCK_LOOK);
    fixture.componentRef.setInput('currentIndex', 2);
    fixture.componentRef.setInput('totalLooks', 6);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    document.body.style.overflow = '';
  });

  describe('hasPrev / hasNext', () => {
    it('hasPrev is false when currentIndex is 0', () => {
      fixture.componentRef.setInput('currentIndex', 0);
      expect(component.hasPrev).toBeFalse();
    });

    it('hasPrev is true when currentIndex is greater than 0', () => {
      fixture.componentRef.setInput('currentIndex', 1);
      expect(component.hasPrev).toBeTrue();
    });

    it('hasNext is false when at the last look', () => {
      fixture.componentRef.setInput('currentIndex', 5);
      fixture.componentRef.setInput('totalLooks', 6);
      expect(component.hasNext).toBeFalse();
    });

    it('hasNext is true when there is a next look', () => {
      fixture.componentRef.setInput('currentIndex', 4);
      fixture.componentRef.setInput('totalLooks', 6);
      expect(component.hasNext).toBeTrue();
    });
  });

  describe('body overflow lock', () => {
    it('sets body overflow to hidden on init', () => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body overflow to empty string on destroy', () => {
      fixture.destroy();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('keyboard shortcuts (@HostListener)', () => {
    it('Escape key emits dismiss', () => {
      let dismissed = false;
      component.dismiss.subscribe(() => (dismissed = true));

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(dismissed).toBeTrue();
    });

    it('ArrowRight key emits navigate(1)', () => {
      let direction: 1 | -1 | undefined;
      component.navigate.subscribe((d) => (direction = d));

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(direction).toBe(1);
    });

    it('ArrowLeft key emits navigate(-1)', () => {
      let direction: 1 | -1 | undefined;
      component.navigate.subscribe((d) => (direction = d));

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

      expect(direction).toBe(-1);
    });
  });

  describe('onBackdropClick()', () => {
    it('emits dismiss when clicking directly on the backdrop', () => {
      let dismissed = false;
      component.dismiss.subscribe(() => (dismissed = true));

      const el = document.createElement('div');
      component.onBackdropClick({ target: el, currentTarget: el } as MouseEvent);

      expect(dismissed).toBeTrue();
    });

    it('does not emit dismiss when clicking inside the panel content', () => {
      let dismissed = false;
      component.dismiss.subscribe(() => (dismissed = true));

      const backdrop = document.createElement('div');
      const panel = document.createElement('div');
      component.onBackdropClick({ target: panel, currentTarget: backdrop } as MouseEvent);

      expect(dismissed).toBeFalse();
    });
  });
});
