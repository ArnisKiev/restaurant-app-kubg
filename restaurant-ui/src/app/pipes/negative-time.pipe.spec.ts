import { NegativeTimePipe } from './negative-time.pipe';

describe('NegativeTimePipe', () => {
  it('create an instance', () => {
    const pipe = new NegativeTimePipe();
    expect(pipe).toBeTruthy();
  });
});
