import React from 'react';

import './VehicleItem.css';

const VehicleItem = ({ filteredVehicles }) => {
  return (
    <div className="vehicle-item">
      <table className="table table-striped">
        <thead>
          <tr>
            <td> Id</td>
            <td> Variant</td>
            <td> Brand</td>
            <td> Color Name</td>
            <td> Engine Capacity (cc)</td>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.length === 0 ? (
            <p>No vehicles found.</p>
          ) : (
            filteredVehicles.map((motor) => (
              <tr key={motor.id}>
                <td> {motor.id}</td>
                <td> {motor.variant}</td>
                <td> {motor.brand}</td>
                <td> {motor.color}</td>
                <td> {motor.engineCapacity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleItem;
