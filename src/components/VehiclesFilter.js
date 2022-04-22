import React, { useState } from 'react';
import VehicleService from '../shared/services/VehicleService';
import Button from '../ui/Button';

import './VehiclesFilter.css';

const VehiclesFilter = ({ onClickSearch }) => {
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

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      console.log("Hello:", search);
      const data = await VehicleService.getVehicle(search);
      console.log("Hi:", data);
      onClickSearch(data || []);
    } catch (err) {
      // TODO: handle error here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vehicles-filter">
      <select value={search.searchBy} onChange={filterByChangeHandler}>
        <option value="" selected disabled hidden>
          Filter By
        </option>
        <option value="all">None (Display All)</option>
        <option value="variant">Variant</option>
        <option value="brand">Brand</option>
        <option value="color">Color</option>
        <option value="engineCapacity">Engine Capacity (cc)</option>
      </select>
      <input type="text" id="searchValue" onChange={searchTextChangeHandler} />
      <Button disabled={isLoading} onClick={handleSearch}>
        {isLoading ? 'Loading' : 'Search'}
      </Button>
    </div>
  );
};

export default VehiclesFilter;
