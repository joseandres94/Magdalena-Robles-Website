import { LookNumberPipe } from './look-number.pipe';

describe('LookNumberPipe', () => {
  const pipe = new LookNumberPipe();

  it('formats a single-digit number with a leading zero', () => {
    expect(pipe.transform(1)).toBe('Look 01');
  });

  it('formats a two-digit number without padding', () => {
    expect(pipe.transform(10)).toBe('Look 10');
  });

  it('formats zero as Look 00', () => {
    expect(pipe.transform(0)).toBe('Look 00');
  });
});
