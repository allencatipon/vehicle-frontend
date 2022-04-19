import React from 'react';
import Button from '../ui/Button';

import './VehiclesFilter.css';

const VehiclesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='vehicles-filter'>
      <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='Honda'>Honda</option>
          <option value='Ducati'>Ducati</option>
          <option value='Aprilla'>Aprilla</option>
        </select>
        <input type="text" id ="searchValue"/>
        <Button>Search</Button>
    </div>
  );
};

export default VehiclesFilter;
