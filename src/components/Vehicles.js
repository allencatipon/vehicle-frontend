import React, { useState, useEffect } from "react";
import VehicleItem from "./VehicleItem";
import VehiclesFilter from "./VehiclesFilter";
import Button from "../ui/Button";
import classes from "./Vehicles.module.css";
import VehicleFormModal from "./VehicleFormModal";
import {useDispatch} from 'react-redux';
import { uiActions } from "../store/ui-slice";
import VehiclePagination from "./VehiclePagination";

const Vehicles = () => {
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const dispatch = useDispatch();

  const [search, setSearch] = useState({
    searchBy: 'all',
    searchValue: '',
    currentPage: 0,
    recordPerPage: 1,
    totalElements: 0,
    totalPages: 0
  });

  const handleVehicle = selectedVehicle => {
    console.log("selectedVehicle: ", selectedVehicle)
    setFilteredVehicles(selectedVehicle);
  };

  const [isShowFormModal, setIsShowFormModal] = useState(false);
  const onModalCancelHandler = () => {
    setIsShowFormModal(false);
    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success',
      message: 'Vehicle saved successfully!',
    }));
  }

  const onClickAddButtonHandler = () => {
    setIsShowFormModal(true);
  }

  return (
    <div>
      {isShowFormModal && <VehicleFormModal isSave ={true} onCancel={onModalCancelHandler}/>}
      <h1 className="text-center"> Vehicle List</h1>
      <div className={classes.wrapper}>
        <VehiclesFilter selected={filteredVehicles} search={search} setSearch={setSearch} 
        onClickSearch={handleVehicle} />
        <div className={classes.buttonWrapper}>
          <Button onClick={onClickAddButtonHandler}>Add Vehicle</Button>
        </div>

      </div>
      <VehicleItem filteredVehicles={filteredVehicles} />
      <VehiclePagination search = {search} onClickSearch={handleVehicle} setSearch={setSearch}/>
    </div>
  );
};

export default Vehicles;
