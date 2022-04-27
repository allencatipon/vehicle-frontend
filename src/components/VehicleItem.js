import React, { useState, Fragment } from 'react';
import UpdateDeleteActionButtons from '../ui/UpdateDeleteActionButtons';
import VehicleFormModal from './VehicleFormModal';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

import './VehicleItem.css';
import VehicleService from '../shared/services/VehicleService';

const VehicleItem = ({ filteredVehicles }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({});

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

  const updateVehicle = (vehicle) => {
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
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Vehicle deleted successfully!',
        })
      );
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
            {filteredVehicles.length === 0 ? (
              <p>No vehicles found.</p>
            ) : (
              filteredVehicles.map((vehicle) => (
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
