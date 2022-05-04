import React, { useState, Fragment } from 'react';
import UpdateDeleteActionButtons from '../ui/UpdateDeleteActionButtons';
import VehicleFormModal from './VehicleFormModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../shared/store/UiSlice';

import './VehicleItem.css';
import VehicleService from '../shared/services/VehicleService';
import { vehicleActions } from '../shared/store/VehicleSlice';

const VehicleItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({});

  const vehicles = useSelector((state) => state.vehicles.records);
  const query = useSelector((state) => state.vehicles.query);

  const dispatch = useDispatch();
  const [isShowEditFormModal, setIsShowEditFormModal] = useState(false);

  const onModalCancelHandler = () => {
    setIsShowEditFormModal(false);
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: 'Vehicle updated successfully!',
      })
    );
  };

  const updateVehicle = async (vehicle) => {
    console.log('Update Vehicle with ID: ', vehicle.id);

    setSelectedVehicle(vehicle);
    setIsShowEditFormModal(true);
  };

  const deleteVehicle = async (vehicle) => {
    try {
      if (!vehicle.id) {
        alert('Vehicle id is required ');
        return;
      }

      setIsLoading(true);

      await VehicleService.delete(vehicle.id);

      // Refetch updated vehicle list
      const data = await VehicleService.get(query);
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Vehicle deleted successfully!',
        })
      );
      dispatch(vehicleActions.setRecords(data.content));
    } catch (err) {
      // TODO: handle api errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      {isShowEditFormModal && (
        <VehicleFormModal
          isSave={false}
          vehicle={selectedVehicle}
          onCancel={onModalCancelHandler}
        />
      )}
      <div className="vehicle-item">
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
            {vehicles.length === 0 ? (
              <p>No vehicles found.</p>
            ) : (
              vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td> {vehicle.id}</td>
                  <td> {vehicle.variant}</td>
                  <td> {vehicle.brand}</td>
                  <td> {vehicle.color}</td>
                  <td> {vehicle.engineCapacity}</td>
                  <td>
                    <UpdateDeleteActionButtons
                      isEditDisabled={isLoading}
                      isDeleteDisabled={isLoading}
                      onUpdate={() => updateVehicle(vehicle)}
                      onDelete={() => deleteVehicle(vehicle)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default VehicleItem;
