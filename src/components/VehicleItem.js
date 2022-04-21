import React, { useState, useEffect } from "react";
import VehicleService from "../services/VehicleService";

import './VehicleItem.css';

const VehicleItem = (props) => {
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  useEffect(() => {
    console.log("VehicleItem: ",props.filterBy);
    VehicleService.getVehicle().then((response) => {
      setFilteredVehicles(response.data);
    });
  }, [props.filterBy]);

  return (
    <div className='vehicle-item'>
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
        {/* {props.filterBy.length === 0 ? (<p>Choose to Search.</p>) : 
          (<p>Yes filterBy color.</p>)
          } */}
          {filteredVehicles.length === 0 ? (<p>No vehicles found.</p>) : 
          filteredVehicles.map((motor) => (
            <tr key={motor.id}>
              <td> {motor.id}</td>
              <td> {motor.variant}</td>
              <td> {motor.brand}</td>
              <td> {motor.color}</td>
              <td> {motor.engineCapacity}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default VehicleItem;
