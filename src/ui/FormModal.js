import classes from './BaseModal.module.css';
import BaseModal from '../ui/BaseModal';
import Button from './Button';

const FormModal = (props) => {

    return <BaseModal title={props.title} onCancel={props.onCancel}>
      <form>
        <div className={classes.content}>
        {props.children}
        </div>
        <footer className={classes.actions}>
            <Button disabled={!props.formIsValid} onClick={props.onSubmit}>{props.submitLabel}</Button>&nbsp;&nbsp;&nbsp;
            <Button onClick={props.onCancel}>Cancel</Button>
        </footer>
      </form>
      </BaseModal>;

}

export default FormModal;