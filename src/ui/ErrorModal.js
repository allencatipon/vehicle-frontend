import classes from './BaseModal.module.css';
import BaseModal from '../ui/BaseModal';
import Button from './Button';

const ErrorModal = (props) => {

    return <BaseModal title={props.title} onConfirm={props.onConfirm}>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onCancel}>Okay</Button>
      </footer>
      </BaseModal>;
}

export default ErrorModal;