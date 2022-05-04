import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  records: [],
  selectedVehicle: {},
  query: {
    searchBy: 'all',
    searchValue: '',
    currentPage: 0,
    recordPerPage: 5,
    totalElements: 0,
    totalPages: 0,
  },
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setRecords(state, action) {
      state.records = action?.payload || [];
    },
    setSelectedVehicle(state, action) {
      state.selectedVehicle = action?.payload || {};
    },
    setQuery(state, action) {
      const payload = action?.payload || initialState.query;
      state.query = {
        ...state.query,
        ...payload,
      };
    },
  },
});

export const vehicleActions = vehicleSlice.actions;

export default vehicleSlice;
