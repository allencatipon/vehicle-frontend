import { useEffect } from 'react';
import FormModal from '../ui/FormModal';
import useInput from '../hooks/use-input';

const VehicleFormModal = (props) => {
    console.log(props.vehicle);
    console.log('Reload Vehicle Form Modal!');
    const isNotEmpty = value => value.trim() !='';

    let vehicleId = 0;

    const {value: variantValue, 
        isValid: variantIsValid,
        hasError: variantHasError,
      valueChangeHandler: variantChangeHandler,
      inputBlurHandler: variantBlurHandler,
     reset: resetVariant,
     setEnteredValue: setVariantValue} = useInput(isNotEmpty);

    const {value: brandValue, 
        isValid: brandIsValid,
        hasError: brandHasError,
      valueChangeHandler: brandChangeHandler,
      inputBlurHandler: brandBlurHandler,
     reset: resetBrand,
     setEnteredValue: setBrandValue} = useInput(isNotEmpty);

     const {value: colorValue, 
        isValid: colorIsValid,
        hasError: colorHasError,
      valueChangeHandler: colorChangeHandler,
      inputBlurHandler: colorBlurHandler,
     reset: resetColor,
     setEnteredValue: setColorValue} = useInput(isNotEmpty);

     const {value: engineCapacityValue, 
        isValid: engineCapacityIsValid,
        hasError: engineCapacityHasError,
      valueChangeHandler: engineCapacityChangeHandler,
      inputBlurHandler: engineCapacityBlurHandler,
     reset: resetEngineCapacity,
     setEnteredValue: setEngineCapacityValue} = useInput(isNotEmpty);

     let formIsValid = false;

     if(variantIsValid, brandIsValid, colorIsValid, engineCapacityIsValid) {
        formIsValid = true;
     }

     useEffect(() => {
        if(props.vehicle && !props.isSave) {
            setVariantValue(props.vehicle.variant);
            setBrandValue(props.vehicle.brand);
            setColorValue(props.vehicle.color);
            setEngineCapacityValue(props.vehicle.engineCapacity);
        }
        }, [setVariantValue, setBrandValue, setColorValue, setEngineCapacityValue]);

     if(props.vehicle && !props.isSave) {
        vehicleId = props.vehicle.id;
     }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(!formIsValid) {
            return;
        }

        console.log("Submitted!");
    }

    const idClasses = 'form-control row';
    const variantClasses = brandHasError? 'form-control row invalid': 'form-control row';
    const brandClasses = brandHasError? 'form-control row invalid': 'form-control row';
    const colorClasses = colorHasError? 'form-control row invalid': 'form-control row';
    const engineCapacityClasses = engineCapacityHasError? 'form-control row invalid': 'form-control row';

    return <FormModal onSubmit = {onSubmitHandler} 
        title = {props.isSave? 'Add Vehicle' : 'Update Vehicle'} 
        submitLabel={props.isSave? 'SAVE' : 'UPDATE'} 
        onCancel = {props.onCancel}
        formIsValid = {formIsValid}>
            <div className='control-group'>
            {!props.isSave && (<div className={idClasses}>
                    <div className='column'><label>ID</label></div>
                    <div className='column'><p className='idlabel'>{vehicleId}</p></div>
                </div>)}

            <div className={variantClasses}>
                    <div className='column'><label htmlFor='variant'>Variant</label></div>
                    <div className='column'>
                    <select value={variantValue}
                    onChange={variantChangeHandler} 
                    onBlur={variantBlurHandler}>
                        <option value='Car'>Car</option>
                        <option value='Motorcycle'>Motorcycle</option>
                    </select></div>
                </div>
                {variantHasError && <p>Please enter a Variant.</p>}

                <div className={brandClasses}>
                    <div className='column'><label htmlFor='brand'>Brand</label></div>
                    <div className='column'><input type="text" id="brand"
                    value={brandValue}
                    onChange={brandChangeHandler}
                    onBlur={brandBlurHandler}/></div>
                </div>
                {brandHasError && <p>Please enter a brand.</p>}

                <div className={colorClasses}>
                <div className='column'><label htmlFor='brand'>Color</label></div>
                <div className='column'><input type="text" id="color"
                    value={colorValue}
                    onChange={colorChangeHandler}
                    onBlur={colorBlurHandler}/></div>
                </div>
                {colorHasError && <p>Please enter a color.</p>}

                <div className={engineCapacityClasses}>
                <div className='column'><label htmlFor='engine capacity'>Engine Capacity</label></div>
                <div className='column'><input type="text" id="engineCapacity"
                    value={engineCapacityValue}
                    onChange={engineCapacityChangeHandler}
                    onBlur={engineCapacityBlurHandler}/></div>
                </div>
                {engineCapacityHasError && <p>Please enter an Engine Capacity.</p>}
            </div>
    </FormModal>
}

export default VehicleFormModal;