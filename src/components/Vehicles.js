import React, { useState } from 'react';
import VehicleItem from './VehicleItem';
import VehiclesFilter from './VehiclesFilter';
import Button from '../ui/Button';
import classes from './Vehicles.module.css';
import VehicleFormModal from './VehicleFormModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../shared/store/UiSlice';
import { vehicleActions } from '../shared/store/VehicleSlice';
import VehiclePagination from './VehiclePagination';
import VehicleService from '../shared/services/VehicleService';

const Vehicles = () => {
  const dispatch = useDispatch();

  const query = useSelector((state) => state.vehicles.query);

  // const handleVehicle = (selectedVehicle) => {
  //   console.log('selectedVehicle: ', selectedVehicle);
  //   setFilteredVehicles(selectedVehicle);
  // };

  const [isShowFormModal, setIsShowFormModal] = useState(false);
  const onModalCancelHandler = () => {
    setIsShowFormModal(false);
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: 'Vehicle saved successfully!',
      })
    );
  };

  const onClickAddButtonHandler = () => {
    setIsShowFormModal(true);
  };

  const getBooksByPagination = async (currentPage) => {
    try {
      // setIsLoading(true);
      const data = await VehicleService.get(query);
      dispatch(vehicleActions.setRecords(data.content));
    } catch (err) {
      // TODO: handle error here
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div>
      {isShowFormModal && (
        <VehicleFormModal vehicle={{}} isSave={true} onCancel={onModalCancelHandler} />
      )}
      <h1 className="text-center"> Vehicle List</h1>
      <div className={classes.wrapper}>
        <VehiclesFilter getBooksByPagination={getBooksByPagination} />
        <div className={classes.buttonWrapper}>
          <Button onClick={onClickAddButtonHandler}>Add Vehicle</Button>
        </div>
      </div>
      <VehicleItem />
      <VehiclePagination getBooksByPagination={getBooksByPagination} />
    </div>
  );
};

export default Vehicles;
