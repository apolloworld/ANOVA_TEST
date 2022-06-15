import { makeState } from '../../testUtils/makeState';
import * as selectors from './counterSelectors';

describe('counterValueSelector', () => {
  it('should return the counter state value', () => {
    const state = makeState({
      counter: {
        value: 123,
      },
    });
    expect(selectors.counterValueSelector(state)).toEqual(123);
  });
});
