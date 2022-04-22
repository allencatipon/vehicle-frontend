import classes from './BaseModal.module.css';
import BaseModal from '../ui/BaseModal';
import Button from './Button';

const FormModal = (props) => {

    return <BaseModal title={props.title} onConfirm={props.onConfirm}>
      <form>
        <div className={classes.content}>
        {props.children}
        </div>
        <footer className={classes.actions}>
            <Button onClick={props.onSubmit}>{props.submitLabel}</Button>
            <Button onClick={props.onCancel}>Cancel</Button>
        </footer>
      </form>
      </BaseModal>;

}

export default FormModal;