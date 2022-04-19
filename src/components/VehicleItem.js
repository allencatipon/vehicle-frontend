import React, { useState, useEffect } from "react";
import VehicleService from "../services/VehicleService";

import './VehicleItem.css';

const VehicleItem = (props) => {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    console.log(props);
    VehicleService.getVehicle().then((response) => {
      setVehicles(response.data);
    });
  }, []);

  const filteredVehicles = vehicles.filter(vehicle => {
    return vehicle.color === props.filterBy;
  });

  return (
    <div className='vehicle-item'>
      <table className="table table-striped">
        <thead>
          <tr>
            <td> Id</td>
            {/* <td> Variant</td> */}
            <td> Brand</td>
            <td> Color Name</td>
            <td> Engine Capacity (cc)</td>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.length === 0 ? (<p>No vehicles found.</p>) : filteredVehicles.map((motor) => (
            <tr key={motor.id}>
              <td> {motor.id}</td>
              <td> {motor.make}</td>
              <td> {motor.color}</td>
              <td> {motor.displacement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleItem;
