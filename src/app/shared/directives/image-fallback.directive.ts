import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: 'img[mrImageFallback]',
})
export class ImageFallbackDirective {
  readonly mrImageFallback = input.required<string>();
  private readonly image = inject<ElementRef<HTMLImageElement>>(ElementRef);
  private applied = false;

  @HostListener('error')
  onError(): void {
    if (this.applied) return;
    this.applied = true;
    this.image.nativeElement.src = this.mrImageFallback();
  }
}
