import FormModal from '../ui/FormModal';
import useForms from '../hooks/useForms';
import VehicleService from '../shared/services/VehicleService';
import { useState } from 'react';

const VehicleFormModal = ({
  isSave,
  vehicle = {},
  search = {},
  onCancel,
  setFilteredVehicles = () => {},
  setSearch = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const vehicleId = vehicle && !isSave ? vehicle.id : 0;
  const isUpdate = Boolean(vehicleId);
  const { formData, formErrors, hasErrors, handleBlur, handleChange, touchedFields, resetForm } =
    useForms({
      variant: vehicle?.variant || '',
      brand: vehicle?.brand || '',
      color: vehicle?.color || '',
      engineCapacity: vehicle?.engineCapacity || '',
    });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      if (hasErrors) {
        alert('Fill up the required fields');
        return;
      }

      setIsLoading(true);

      if (vehicleId) {
        await VehicleService.update(vehicleId, formData);
      } else {
        console.log('formData', formData);
        await VehicleService.create(formData);
      }
      console.log(' search', search);
      const vehicles = await VehicleService.get(search, search?.currentPage);
      console.log('vehicles', vehicles);
      setSearch((prevState) => {
        console.log('prevState', prevState);
        return {
          ...prevState,
          currentPage: vehicles.number + 1,
          totalPages: vehicles.totalPages,
          totalElements: vehicles.totalElements,
        };
      });
      setFilteredVehicles(vehicles.content);
      handleCancel();
    } catch (err) {
      console.log('err', err);
      // TODO: handle api errors
    } finally {
      setIsLoading(false);
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    onCancel();
    resetForm();
    setIsLoading(false);
    setIsSaving(false);
  };

  return (
    <FormModal
      onSubmit={onSubmitHandler}
      title={isSave ? 'Add Vehicle' : 'Update Vehicle'}
      submitLabel={isSave ? 'SAVE' : 'UPDATE'}
      onCancel={handleCancel}
      disableSubmit={isLoading || (isSaving && hasErrors)}
    >
      <div className="control-group">
        {!isSave && (
          <div className={'form-control row'}>
            <div className="column">
              <label>ID</label>
            </div>
            <div className="column">
              <p className="idlabel">{vehicleId}</p>
            </div>
          </div>
        )}

        <div className={`form-control row ${isSaving && formErrors.variant ? 'invalid' : ''}`}>
          <div className="column">
            <label htmlFor="variant">Variant</label>
          </div>
          <div className="column">
            <select
              name="variant"
              value={formData.variant}
              onChange={handleChange}
              onBlur={() => handleBlur('variant')}
              disabled={isUpdate}
            >
              <option value="" disabled>
                Select a variant
              </option>
              <option value="Car">Car</option>
              <option value="Motorcycle">Motorcycle</option>
            </select>
          </div>
        </div>
        {formErrors.variant && touchedFields.variant && <p>Please enter a Variant.</p>}

        <div className={`form-control row ${isSaving && formErrors.brand ? 'invalid' : ''}`}>
          <div className="column">
            <label htmlFor="brand">Brand</label>
          </div>
          <div className="column">
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              onBlur={() => handleBlur('brand')}
            />
          </div>
        </div>
        {formErrors.brand && touchedFields.brand && <p>Please enter a brand.</p>}

        <div className={`form-control row ${isSaving && formErrors.color ? 'invalid' : ''}`}>
          <div className="column">
            <label htmlFor="brand">Color</label>
          </div>
          <div className="column">
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              onBlur={() => handleBlur('color')}
            />
          </div>
        </div>
        {formErrors.color && touchedFields.color && <p>Please enter a color.</p>}

        <div
          className={`form-control row ${isSaving && formErrors.engineCapacity ? 'invalid' : ''}`}
        >
          <div className="column">
            <label htmlFor="engine capacity">Engine Capacity</label>
          </div>
          <div className="column">
            <input
              type="text"
              id="engineCapacity"
              name="engineCapacity"
              value={formData.engineCapacity}
              onChange={handleChange}
              onBlur={() => handleBlur('engineCapacity')}
            />
          </div>
        </div>
        {formErrors.engineCapacity && touchedFields.engineCapacity && (
          <p>Please enter an Engine Capacity.</p>
        )}
      </div>
    </FormModal>
  );
};

export default VehicleFormModal;
