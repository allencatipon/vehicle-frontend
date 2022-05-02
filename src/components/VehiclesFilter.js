import React, { useState } from 'react';
import VehicleService from '../shared/services/VehicleService';
import Button from '../ui/Button';

import './VehiclesFilter.css';

const VehiclesFilter = ({ onClickSearch, search, setSearch }) => {
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
      let currentPage = 0;
      console.log('handleSearch:', search);
      const data = await VehicleService.get(search, currentPage);
      console.log('handleSearch:', data);
      setSearch((prevState) => {
        return {
          ...prevState,
          currentPage: data.number + 1,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
        };
      });
      onClickSearch(data.content || []);
    } catch (err) {
      // TODO: handle error here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vehicles-filter">
      <span>Filter By:</span>&nbsp;
      <select value={search.searchBy} onChange={filterByChangeHandler}>
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
