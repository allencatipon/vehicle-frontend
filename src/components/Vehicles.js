import React, { useState, useEffect } from "react";
import VehicleItem from "./VehicleItem";
import VehiclesFilter from "./VehiclesFilter";
import Button from "../ui/Button";
import classes from "./Vehicles.module.css";

const Vehicles = (props) => {
  let searchValue = [];

  const [isShowFormModal, setIsShowFormModal] = useState(true);
  const errorHandler = () => {

  }

  const getSearValueHandler = (enteredSearchValue) =>{
    searchValue = {
      ...enteredSearchValue, id: Math.random().toString()
    };
    console.log(searchValue);
  }

  return (
    <div>
      <h1 className="text-center"> Vehicle List</h1>
      <div className={classes.wrapper}>
        <VehiclesFilter onGetSearchValue={getSearValueHandler}/>
        <Button>Add Vehicle</Button>
      </div>
      <VehicleItem filterBy={searchValue} />
    </div>
  );
};

export default Vehicles;
