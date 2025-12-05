import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavState {
  incompleteVisits: number | null;
}

const initialState: NavState = {
  incompleteVisits: null,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,

  /* eslint-disable no-param-reassign */
  reducers: {
    updateIncompleteVisits: (state, action: PayloadAction<number | null>) => {
      state.incompleteVisits = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const {
  actions: { updateIncompleteVisits },
  name: navSliceKey,
  reducer: navReducer,
} = navSlice;
