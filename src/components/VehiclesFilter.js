import React from 'react';

import './VehiclesFilter.css';

const VehiclesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='vehicles-filter'>
      <div className='vehicles-filter__control'>
        <label>Filter by year</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='Honda'>Honda</option>
          <option value='Ducati'>Ducati</option>
          <option value='Aprilla'>Aprilla</option>
        </select>
      </div>
    </div>
  );
};

export default VehiclesFilter;
