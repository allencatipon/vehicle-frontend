import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './UiSlice';
import vehicleSlice from './VehicleSlice';

const store = configureStore({
  reducer: { ui: uiSlice.reducer, vehicles: vehicleSlice.reducer },
});

export default store;
