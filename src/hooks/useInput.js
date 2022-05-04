import {useState} from 'react';



const useInput = (validateValue) => {

    const [enteredValue, setEnteredValue] = useState(''); 
    const [enteredValueTouched, setEnteredValueTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && enteredValueTouched;

    const valueChangeHandler = event => {
        setEnteredValue(event.target.value);
    }

    const inputBlurHandler = event => {
        console.log('entered blur handler!');
        setEnteredValueTouched(true);
      
    }

    const reset = () => {
        setEnteredValue('');
        setEnteredValueTouched(false);
    }

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
        setEnteredValue
    }

}

export default useInput;





