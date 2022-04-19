import React, {useState} from 'react';
import Button from '../ui/Button';

import './VehiclesFilter.css';

const VehiclesFilter = (props) => {
  const [searchValue, setSearchValue] = useState({
    enteredText: '',
    selectedFilter: ''
  });

  const filterByChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
    setSearchValue((prevState) => {
      return { ...prevState, selectedFilter: event.target.value };
    });
  };

  const searchTextChangeHandler = (event) => {
    setSearchValue((prevState) => {
      return { ...prevState, enteredText: event.target.value };
    });
  };

  const searchHandler = (event) => {
    event.preventDefault();
    console.log(searchValue);
  };

  return (
    <form onSubmit={searchHandler}>
      <div className='vehicles-filter'>
        <select value={props.selected} onChange={filterByChangeHandler}>
            <option value="" selected disabled hidden>Filter By</option>
            <option value='Honda'>Honda</option>
            <option value='Ducati'>Ducati</option>
            <option value='Aprilla'>Aprilla</option>
          </select>
          <input type="text" id ="searchValue" onChange={searchTextChangeHandler} / >
          <Button type='submit'>Search</Button>
      </div>
    </form>
  );
};

export default VehiclesFilter;
