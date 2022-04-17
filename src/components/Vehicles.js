import React, { useState, useEffect } from "react";
import VehicleItem from "./VehicleItem";
import VehiclesFilter from "./VehiclesFilter";

const Vehicles = (props) => {
  const [filteredVehicle, setFilteredVehicle] = useState([]);
  const filterChangeHandler = selectedVehicle => {
    setFilteredVehicle(selectedVehicle);
  };

  return (
    <div>
      <h1 className="text-center"> Vehicle List</h1>
      <VehiclesFilter selected={filteredVehicle} onChangeFilter={filterChangeHandler} />
      <VehicleItem/>
    </div>
  );
};

export default Vehicles;
