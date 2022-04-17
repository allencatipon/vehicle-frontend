import React, { useState, useEffect } from "react";
import VehicleService from "../services/VehicleService";

import './VehicleItem.css';

const VehicleItem = (props) => {
  const [vehicle, setVehicle] = useState([]);
  useEffect(() => {
    VehicleService.getVehicle().then((response) => {
      setVehicle(response.data);
    });
  }, []);

  return (
    <div className='vehicle-item'>
      <table className="table table-striped">
        <thead>
          <tr>
            <td> Id</td>
            <td> Color Name</td>
            <td> Make Name</td>
            <td> Displacement</td>
          </tr>
        </thead>
        <tbody>
          {vehicle.map((motor) => (
            <tr key={motor.id}>
              <td> {motor.id}</td>
              <td> {motor.color}</td>
              <td> {motor.make}</td>
              <td> {motor.displacement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleItem;
