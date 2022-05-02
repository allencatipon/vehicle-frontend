import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  records: [],
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    set(state, action) {
      state.records = action.payload;
    },
  },
});

export const vehicleActions = vehicleSlice.actions;

export default vehicleSlice;
