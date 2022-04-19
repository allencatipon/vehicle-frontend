import FormModal from '../ui/FormModal';

const VehicleFormModal = (props) => {

    const onSubmitHandler = () => {

    }

    return <FormModal onSubmit = {onSubmitHandler} 
        title = {'Add Vehicle'} 
        submitLabel={'SAVE'} 
        onCancel = {props.onCancel}>

    </FormModal>
}

export default VehicleFormModal;