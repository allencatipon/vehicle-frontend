import React, { useState, useEffect } from "react";
import VehicleItem from "./VehicleItem";
import VehiclesFilter from "./VehiclesFilter";
import Button from "../ui/Button";
import classes from "./Vehicles.module.css";
import VehicleFormModal from "./VehicleFormModal";
import {useDispatch} from 'react-redux';
import { uiActions } from "../store/ui-slice";

const Vehicles = (props) => {
  const [filteredVehicle, setFilteredVehicle] = useState([]);
  const dispatch = useDispatch();

  const filterChangeHandler = selectedVehicle => {
    setFilteredVehicle(selectedVehicle);
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
        <VehiclesFilter selected={filteredVehicle} onChangeFilter={filterChangeHandler} />
        <div className={classes.buttonWrapper}>
          <Button onClick={onClickAddButtonHandler}>Add Vehicle</Button>
        </div>
      </div>
      <VehicleItem/>
    </div>
  );
};

export default Vehicles;
