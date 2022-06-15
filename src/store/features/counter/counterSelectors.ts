import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../types';

const counterSelector = (state: AppState) => state.counter;

export const counterValueSelector = createSelector(counterSelector, state => state.value);
