import FormModal from '../ui/FormModal';
import useForms from '../hooks/useForms';
import VehicleService from '../shared/services/VehicleService';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const VehicleFormModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const query = useSelector((state) => state.vehicles.query);
  const vehicleId = props.vehicle && !props.isSave ? props.vehicle.id : 0;
  const isUpdate = Boolean(vehicleId);
  const { formData, formErrors, hasErrors, handleBlur, handleChange, touchedFields, resetForm } =
    useForms({
      variant: props?.vehicle?.variant || '',
      brand: props?.vehicle?.brand || '',
      color: props?.vehicle?.color || '',
      engineCapacity: props?.vehicle?.engineCapacity || '',
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
      console.log('pre-RUNNN');
      if (vehicleId) {
        await VehicleService.update(vehicleId, formData);
      } else {
        console.log('formData', formData);
        await VehicleService.create(formData);
      }
      console.log('RUNNN');
      await props.getBooksByPagination(query);

      handleCancel();
    } catch (err) {
      // TODO: handle api errors
    } finally {
      setIsLoading(false);
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    props.onCancel();
    resetForm();
    setIsLoading(false);
    setIsSaving(false);
  };

  return (
    <FormModal
      onSubmit={onSubmitHandler}
      title={props.isSave ? 'Add Vehicle' : 'Update Vehicle'}
      submitLabel={props.isSave ? 'SAVE' : 'UPDATE'}
      onCancel={handleCancel}
      disableSubmit={isLoading || (isSaving && hasErrors)}
    >
      <div className="control-group">
        {!props.isSave && (
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
