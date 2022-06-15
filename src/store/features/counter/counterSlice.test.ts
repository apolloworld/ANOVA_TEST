import { CounterState, counterReducer, counterActions } from './counterSlice';

describe('counter/slice', () => {
  it('should have a correct initial state', () => {
    // When
    const state = counterReducer(undefined, { type: 'INIT' });
    // Then
    expect(state).toEqual<CounterState>({ value: 0 });
  });

  it('should handle increment action', () => {
    // Given
    const initialState: CounterState = { value: 1 };
    // When
    const state = counterReducer(initialState, counterActions.increment());
    // Then
    expect(state).toEqual<CounterState>({ value: 2 });
  });

  it('should handle decrement action', () => {
    // Given
    const initialState: CounterState = { value: 1 };
    // When
    const state = counterReducer(initialState, counterActions.decrement());
    // Then
    expect(state).toEqual<CounterState>({ value: 0 });
  });

  it('should handle incrementByAmount action', () => {
    // Given
    const initialState: CounterState = { value: 1 };
    // When
    const state = counterReducer(initialState, counterActions.incrementByAmount(5));
    // Then
    expect(state).toEqual<CounterState>({ value: 6 });
  });
});
