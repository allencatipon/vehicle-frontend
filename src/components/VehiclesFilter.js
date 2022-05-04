import React from 'react';
import Button from '../ui/Button';

import './VehiclesFilter.css';

const VehiclesFilter = ({ search, setSearch, getBooksByPagination }) => {
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
      <Button onClick={getBooksByPagination}>Search</Button>
    </div>
  );
};

export default VehiclesFilter;
