import { useRef, useState } from 'react';
import classes from './CheckoutForm.module.css';

const CheckoutForm = ({ onSubmitOrder }) => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
    email: true,
  });

  const orderSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;

    let enteredNameIsValid = true;
    let enteredStreetIsValid = true;
    let enteredCityIsValid = true;
    let enteredEmailIsValid = true;
    let enteredPostalCodeIsValid = true;

    if (enteredName.trim() === '') {
      enteredNameIsValid = false;
    }

    if (enteredStreet.trim() === '') {
      enteredStreetIsValid = false;
    }

    if (enteredCity.trim() === '') {
      enteredCityIsValid = false;
    }

    if (/\S+@\S+\.\S+/.test(enteredEmail) === false) {
      enteredEmailIsValid = false;
    }

    if (
      /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY][ -]?\d[ABCEGHJKLMNPRSTVXY]\d$/i.test(
        enteredPostalCode
      ) === false
    ) {
      enteredPostalCodeIsValid = false;
    }

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
      email: enteredEmailIsValid,
    });

    const overallFormIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid &&
      enteredEmailIsValid;

    if (!overallFormIsValid) {
      // form is invalid
      return;
    }

    onSubmitOrder({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
      email: enteredEmail,
    });
  };

  return (
    <form onSubmit={orderSubmitHandler} className={classes.form}>
      <h2>Please Enter Your Delivery Infomation</h2>
      <div className={classes['input-group']}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && (
          <p className={classes['error-msg']}>Please enter a valid name</p>
        )}
      </div>
      <div className={classes['input-group']}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailInputRef} />
        {!formInputValidity.email && (
          <p className={classes['error-msg']}>Please enter a valid email</p>
        )}
      </div>
      <div className={classes['input-group']}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && (
          <p className={classes['error-msg']}>Please enter a valid street</p>
        )}
      </div>
      <div className={classes['input-group']}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && (
          <p className={classes['error-msg']}>Please enter a valid city</p>
        )}
      </div>
      <div className={classes['input-group']}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postalCode && (
          <p className={classes['error-msg']}>
            Please enter a valid postal code
          </p>
        )}
      </div>
      <div className={classes.action}>
        <button className={classes.submit} type="submit">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
