import React, { useState, useEffect, Fragment } from "react";
import VehicleService from "../services/VehicleService";
import UpdateDeleteActionButtons from "../ui/UpdateDeleteActionButtons";
import VehicleFormModal from "./VehicleFormModal";
import {useDispatch} from 'react-redux';
import { uiActions } from "../store/ui-slice";

import './VehicleItem.css';

const VehicleItem = (props) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({});

  useEffect(() => {
    VehicleService.getVehicle().then((response) => {
      setVehicles(response.data);
    });
  }, []);

  const dispatch = useDispatch();
  const [isShowEditFormModal, setIsShowEditFormModal] = useState(false);

  const onModalCancelHandler = () => {
    setIsShowEditFormModal(false);
    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success',
      message: 'Vehicle updated successfully!',
    }));
  }

  const updateVehicle = (vehicle) => {
    console.log('Update Vehicle with ID: ', vehicle.id);
    setSelectedVehicle(vehicle);
    setIsShowEditFormModal(true);

  }

  const deleteVehicle = (vehicle) => {
    console.log('Delete Vehicle with ID: ', vehicle.id);

    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success',
      message: 'Vehicle deleted successfully!',
    }));
  }

  return (
    <Fragment> 
      {isShowEditFormModal && <VehicleFormModal isSave ={false}
      vehicle = {selectedVehicle}
      onCancel={onModalCancelHandler}/>}
    <div className='vehicle-item'>
      <table className="table table-striped">
        <thead>
          <tr>
            <td> ID</td>
            <td>Variant</td>
            <td> Brand</td>
            <td> Color</td>
            <td> Engine Capacity (CC)</td>
            <td> Action(s)</td>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
               <td> {vehicle.id}</td>
              <td> {vehicle.variant}</td>
              <td> {vehicle.brand}</td>
              <td> {vehicle.color}</td>
              <td> {vehicle.engineCapacity}</td>
              <td><UpdateDeleteActionButtons onUpdate = {()=> updateVehicle(vehicle)}
              onDelete = { ()=> deleteVehicle(vehicle)}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Fragment>
  );
}

export default VehicleItem;
