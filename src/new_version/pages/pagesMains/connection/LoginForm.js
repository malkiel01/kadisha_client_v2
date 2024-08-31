import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { GlobalContext } from '../../../../App'
import { login } from '../../../../database/queries/queryConnection/connectedQueries';
import InputTemplate from '../../../accessories/inputs/css/input/inputTemplate';
import ButtonTemplate from '../../../accessories/inputs/css/button/buttonTemplate';

  const LoginForm = () => {
  const { token, setToken, setPermission } = useContext(GlobalContext)
  const [formData, setFormData] = useState({
    lineNameHe: '',
    password: '',
  });

  const [errorName, setErrorName] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const navigate = useNavigate()

  const handleInputChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let valid = false
    let usernameLogin = ''
    let passwordLogin = ''

    if (formData?.name === ('') || formData?.name === null || formData?.name === undefined) {
      setErrorName('השדה שדה חובה');
      valid = true
    } else {
      setErrorName('');
      usernameLogin = formData?.name
    }

    if (formData?.password === ('') || formData?.password === null || formData?.password === undefined) {
      setErrorPassword('לא הוזן סיסמה');
      valid = true
    } else {
      setErrorPassword('');
      passwordLogin = formData?.password
    }

    if (!valid) {
      console.log("Registration Data:", formData)
         // כאן תוכל לבצע לוגיקת כניסת משתמש כמו לשלוח את שם המשתמש והסיסמה לשרת
         let ok = await login({usernameLogin,passwordLogin}, {token, setToken, setPermission})
         if (ok) {
           navigate('/')
         }
    } else {
      console.log('המידע לא נשלח');
    }

  }

  return (
    <form onSubmit={handleSubmit} dir='rtl'>
    <InputTemplate
       type="name"
       placeholder="Name"
       name="name"
       defaultValue={formData?.name}
       onChange={(e) => handleInputChange(e, 'name')}
       error={errorName}
     />
      <InputTemplate
        type="password"
        placeholder="Password"
        name="password"
        defaultValue={formData?.password}
        onChange={(e) => handleInputChange(e, 'password')}
        error={errorPassword}
      />

      <ButtonTemplate type="submit" text="Login" />
    </form>
  );
}

export default LoginForm;

