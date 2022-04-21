import React, { useState } from 'react';
import VehicleService from '../shared/services/VehicleService';
import Button from '../ui/Button';

import './VehiclesFilter.css';

const VehiclesFilter = ({ setFilteredVehicles, selected }) => {
  const [search, setSearch] = useState({
    searchBy: '',
    searchValue: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const filterByChangeHandler = (event) => {
    setSearch((prevState) => {
      return { ...prevState, searchBy: event.target.value };
    });
  };

  const searchTextChangeHandler = (event) => {
    setSearch((prevState) => {
      return { ...prevState, searchValue: event.target.value };
    });
  };

  const onClickSearch = async () => {
    try {
      setIsLoading(true);
      const data = await VehicleService.getVehicle(search);
      setFilteredVehicles(data || []);
    } catch (err) {
      // TODO: handle error here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vehicles-filter">
      <select value={selected} onChange={filterByChangeHandler}>
        <option value="" selected disabled hidden>
          Filter By
        </option>
        <option value="variant">Variant</option>
        <option value="brand">Brand</option>
        <option value="color">Color</option>
        <option value="engineCapacity">Engine Capacity (cc)</option>
      </select>
      <input type="text" id="searchValue" onChange={searchTextChangeHandler} />
      <Button disabled={isLoading} onClick={onClickSearch}>
        {isLoading ? 'Loading' : 'Search'}
      </Button>
    </div>
  );
};

export default VehiclesFilter;
