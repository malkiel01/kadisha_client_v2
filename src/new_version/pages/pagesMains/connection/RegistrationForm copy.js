import React, { useState } from 'react';
import InputTemplate from '../../../accessories/inputs/css/button/buttonTemplate'
import ButtonTemplate from '../../../accessories/inputs/css/button/buttonTemplate'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('')
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('')

  const handleInputChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    let valid = false

    if (formData?.firstName === ('') || formData?.firstName === null || formData?.firstName === undefined) {
      setErrorFirstName('השדה שדה חובה');
      valid = true
    } else {
      setErrorFirstName('');
    }
    if (formData?.lastName === ('') || formData?.lastName === null || formData?.lastName === undefined) {
      setErrorLastName('השדה שדה חובה');
      valid = true
    } else {
      setErrorLastName('');
    }
    if (formData?.email === ('') || formData?.email === null || formData?.email === undefined) {
      setErrorEmail('השדה שדה חובה');
      valid = true
    } else {
      setErrorEmail('');
    }
    if (formData?.password === ('') || formData?.password === null || formData?.password === undefined) {
      setErrorPassword('לא הוזן סיסמה');
      valid = true
    } else {
      setErrorPassword('');
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorConfirmPassword('הסיסמאות אינן תואמות');
      valid = true
    } else {
      setErrorConfirmPassword('');
    }

    if (!valid) {
      console.log("Registration Data:", formData);
    } else {
      console.log('המידע לא נשלח');
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <InputTemplate
        type="text"
        placeholder="First Name"
        name="firstName"
        defaultValue={formData?.firstName}
        onChange={(e) => handleInputChange(e, 'firstName')}
        error={errorFirstName}
      />
      <InputTemplate
        type="text"
        placeholder="Last Name"
        name="lastName"
        defaultValue={formData?.lastName}
        onChange={(e) => handleInputChange(e, 'lastName')}
        error={errorLastName}
      />
      <InputTemplate
        type="email"
        placeholder="Email"
        name="email"
        defaultValue={formData?.email}
        onChange={(e) => handleInputChange(e, 'email')}
        error={errorEmail}
      />
      <InputTemplate
        type="password"
        placeholder="Password"
        name="password"
        defaultValue={formData?.password}
        onChange={(e) => handleInputChange(e, 'password')}
        error={errorPassword}
      />
      <InputTemplate
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        defaultValue={formData?.confirmPassword}
        onChange={(e) => handleInputChange(e, 'confirmPassword')}
        error={errorConfirmPassword}
      />
      <ButtonTemplate text="Register" onClick={handleSubmit}/>
    </form>
  );
};

export default RegistrationForm;



