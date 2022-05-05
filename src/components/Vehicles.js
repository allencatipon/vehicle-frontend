import React, { useState, useCallback } from 'react';
import VehicleItem from './VehicleItem';
import VehiclesFilter from './VehiclesFilter';
import Button from '../ui/Button';
import classes from './Vehicles.module.css';
import VehicleFormModal from './VehicleFormModal';
import { useDispatch } from 'react-redux';
import { uiActions } from '../shared/store/UiSlice';
import { vehicleActions } from '../shared/store/VehicleSlice';
import VehiclePagination from './VehiclePagination';
import VehicleService from '../shared/services/VehicleService';

const Vehicles = () => {
  const dispatch = useDispatch();

  const [isShowFormModal, setIsShowFormModal] = useState(false);

  const getBooksByPagination = useCallback(
    async (searchQuery) => {
      try {
        // setIsLoading(true);
        const data = await VehicleService.get({
          ...searchQuery,
          currentPage: Math.max(searchQuery.currentPage - 1, 0),
        });
        dispatch(vehicleActions.setRecords(data.content));
        const pageCount = Math.ceil(data?.totalElements / searchQuery.recordPerPage);

        if (searchQuery.currentPage > pageCount) {
          const data = await VehicleService.get({
            ...searchQuery,
            currentPage: Math.max(searchQuery.currentPage - 2, 0),
          });
          dispatch(vehicleActions.setRecords(data.content));
        }
        dispatch(
          vehicleActions.setQuery({
            totalPages: pageCount || 0,
            currentPage: searchQuery.currentPage >= pageCount ? pageCount : searchQuery.currentPage,
            totalElements: data?.totalElements || 0,
          })
        );
      } catch (err) {
        // TODO: handle error here
      } finally {
        // setIsLoading(false);
      }
    },
    [dispatch]
  );

  const onModalCancelHandler = () => {
    setIsShowFormModal(false);
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: 'Vehicle saved successfully!',
      })
    );
  };

  const onClickAddButtonHandler = () => {
    setIsShowFormModal(true);
  };

  return (
    <div>
      {isShowFormModal && (
        <VehicleFormModal
          vehicle={{}}
          isSave={true}
          onCancel={onModalCancelHandler}
          getBooksByPagination={getBooksByPagination}
        />
      )}
      <h1 className="text-center"> Vehicle List</h1>
      <div className={classes.wrapper}>
        <VehiclesFilter getBooksByPagination={getBooksByPagination} />
        <div className={classes.buttonWrapper}>
          <Button onClick={onClickAddButtonHandler}>Add Vehicle</Button>
        </div>
      </div>
      <VehicleItem getBooksByPagination={getBooksByPagination} />
      <VehiclePagination getBooksByPagination={getBooksByPagination} />
    </div>
  );
};

export default Vehicles;
