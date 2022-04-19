import React, { useState, useEffect } from "react";
import VehicleItem from "./VehicleItem";
import VehiclesFilter from "./VehiclesFilter";
import Button from "../ui/Button";
import classes from "./Vehicles.module.css";

const Vehicles = (props) => {
  const [filteredVehicle, setFilteredVehicle] = useState([]);
  const filterChangeHandler = selectedVehicle => {
    setFilteredVehicle(selectedVehicle);
  };

  const [isShowFormModal, setIsShowFormModal] = useState(true);
  const errorHandler = () => {

  }

  return (
    <div>
      <h1 className="text-center"> Vehicle List</h1>
      <div className={classes.wrapper}>
        <VehiclesFilter selected={filteredVehicle} onChangeFilter={filterChangeHandler} />
        <Button>Add Vehicle</Button>
      </div>
      <VehicleItem/>
    </div>
  );
};

export default Vehicles;
