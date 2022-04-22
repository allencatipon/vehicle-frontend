import React, { useState } from 'react';
import VehicleItem from './VehicleItem';
import VehiclesFilter from './VehiclesFilter';
import Button from '../ui/Button';
import classes from './Vehicles.module.css';

const Vehicles = () => {
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  return (
    <div>
      <h1 className="text-center"> Vehicle List</h1>
      <div>
        <VehiclesFilter setFilteredVehicles={setFilteredVehicles} />
        <Button>Add Vehicle</Button>
      </div>
      <VehicleItem filteredVehicles={filteredVehicles} />
    </div>
  );
};

export default Vehicles;
