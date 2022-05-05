import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vehicleActions } from '../shared/store/VehicleSlice';
import Button from '../ui/Button';

import './VehiclesFilter.css';

const VehiclesFilter = ({ getBooksByPagination }) => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.vehicles.query);

  const filterByChangeHandler = (event) => {
    dispatch(
      vehicleActions.setQuery({
        searchBy: event.target.value,
      })
    );
  };

  const searchTextChangeHandler = (event) => {
    dispatch(
      vehicleActions.setQuery({
        searchValue: event.target.value,
      })
    );
  };

  const handleSearch = () => {
    getBooksByPagination({
      ...query,
      currentPage: 1,
    });
  };

  return (
    <div className="vehicles-filter">
      <span>Filter By:</span>&nbsp;
      <select value={query.searchBy} onChange={filterByChangeHandler}>
        <option value="all">None (Display All)</option>
        <option value="variant">Variant</option>
        <option value="brand">Brand</option>
        <option value="color">Color</option>
        <option value="engineCapacity">Engine Capacity (cc)</option>
      </select>
      <input type="text" id="searchValue" onChange={searchTextChangeHandler} />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default VehiclesFilter;
