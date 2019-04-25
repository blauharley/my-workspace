import { TransformMyRegExpIntoStringsPipe } from './transform-my-reg-exp-into-strings.pipe';

describe('TransformMyRegExpIntoStringsPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformMyRegExpIntoStringsPipe();
    expect(pipe).toBeTruthy();
  });
});
