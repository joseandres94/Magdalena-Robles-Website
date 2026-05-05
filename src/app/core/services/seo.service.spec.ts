import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from './seo.service';
import { LOOKS_DATA } from '../../data/collection.data';

describe('SeoService', () => {
  let service: SeoService;
  let titleSpy: jasmine.SpyObj<Title>;
  let metaSpy: jasmine.SpyObj<Meta>;

  beforeEach(() => {
    titleSpy = jasmine.createSpyObj<Title>('Title', ['setTitle', 'getTitle']);
    metaSpy = jasmine.createSpyObj<Meta>('Meta', ['updateTag']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy },
      ],
    });
    service = TestBed.inject(SeoService);
  });

  describe('setPage()', () => {
    it('appends the brand name to the provided title', () => {
      service.setPage({ title: 'Colección' });

      expect(titleSpy.setTitle).toHaveBeenCalledWith('Colección — Magdalena Robles');
    });

    it('uses the default brand title when no title is provided', () => {
      service.setPage({});

      expect(titleSpy.setTitle).toHaveBeenCalledWith(
        'Magdalena Robles — Designer & Pattern Maker',
      );
    });

    it('sets the meta description tag', () => {
      service.setPage({ description: 'Una colección de moda contemporánea' });

      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: 'Una colección de moda contemporánea',
      });
    });

    it('sets og:title to the formatted title', () => {
      service.setPage({ title: 'Colección' });

      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        property: 'og:title',
        content: 'Colección — Magdalena Robles',
      });
    });

    it('sets og:description', () => {
      service.setPage({ description: 'Test description' });

      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        property: 'og:description',
        content: 'Test description',
      });
    });

    it('sets og:image when an image URL is provided', () => {
      service.setPage({ image: 'https://example.com/cover.jpg' });

      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        property: 'og:image',
        content: 'https://example.com/cover.jpg',
      });
    });

    it('does not set og:image when no image is provided', () => {
      service.setPage({ title: 'Test' });

      const ogImageCalled = metaSpy.updateTag.calls
        .allArgs()
        .some((args) => (args[0] as { property?: string }).property === 'og:image');

      expect(ogImageCalled).toBeFalse();
    });
  });

  describe('setLookPage()', () => {
    it('formats the document title as look name — collection — brand', () => {
      const look = LOOKS_DATA[0]; // Pedrolino
      service.setLookPage(look);

      expect(titleSpy.setTitle).toHaveBeenCalledWith(
        `${look.name} — Lobotomy Chic SS25 — Magdalena Robles`,
      );
    });

    it('uses the look editorialDescription as meta description', () => {
      const look = LOOKS_DATA[0];
      service.setLookPage(look);

      expect(metaSpy.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: look.editorialDescription,
      });
    });
  });
});
