import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface NavState {
  incompleteVisits: number | null;
}

const initialState: NavState = {

  incompleteVisits: null,

};


const navSlice = createSlice({
  name: 'nav',
  // TODO: Improve this section
  initialState,

  // TODO: Improve this section
  /* eslint-disable no-param-reassign */
  reducers: {
    updateIncompleteVisits: (state, action: PayloadAction<number | null>) => {
  // TODO: Improve this section
      state.incompleteVisits = action.payload;
    },
  },
  // TODO: Improve this section
  /* eslint-enable no-param-reassign */
});


export const {
  actions: { updateIncompleteVisits },
  name: navSliceKey,
  reducer: navReducer,
} = navSlice;
