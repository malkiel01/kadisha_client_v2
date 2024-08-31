import React, { useState, useContext } from 'react'
import { GlobalContext } from '../../../App'
import { login, registration } from '../../../database/queries/queryConnection/connectedQueries'
import { useNavigate } from 'react-router-dom'

const LoginLayouts = () => {
    const { token, setToken, setPermission } = useContext(GlobalContext)
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [usernameSignin, setUsernameSignin] = useState('');
    const [passwordSignin, setPasswordSignin] = useState('')

    const navigate = useNavigate()
  
    const handleUsernameLoginChange = (e) => {
      setUsernameLogin(e.target.value);
    }
  
    const handlePasswordLoginChange = (e) => {
      setPasswordLogin(e.target.value);
    }
  
    const handleUsernameSigninChange = (e) => {
      setUsernameSignin(e.target.value);
    }
  
    const handlePasswordSigninChange = (e) => {
      setPasswordSignin(e.target.value);
    }
  
    const handleSubmitLogin = async (e) => {
      e.preventDefault()
      // כאן תוכל לבצע לוגיקת כניסת משתמש כמו לשלוח את שם המשתמש והסיסמה לשרת
      let ok = await login({usernameLogin,passwordLogin}, {token, setToken, setPermission})
      if (ok) {
        navigate('/')
      }
    }
  
    const handleSubmitSignin = (e) => {
      e.preventDefault();
      // כאן תוכל לבצע לוגיקת כניסת משתמש כמו לשלוח את שם המשתמש והסיסמה לשרת
      registration({usernameSignin,passwordSignin}, {token, setToken})
    }

    return (
        <div>
            <header>
                <nav>
                    <h1>Login</h1>
                </nav>
            </header>
            <main>
                <div>
                    <h1>הרשמה</h1>
                    <form onSubmit={handleSubmitSignin}>
                        <div>
                            <label>שם משתמש:</label>
                            <input
                            type="text"
                            value={usernameSignin}
                            onChange={handleUsernameSigninChange}
                            />
                        </div>
                        <div>
                            <label>סיסמה:</label>
                            <input
                            type="password"
                            value={passwordSignin}
                            onChange={handlePasswordSigninChange}
                            />
                        </div>
                        <button type="submit">כניסה</button>
                    </form>
                </div>
                <div>
                    <h1>כניסה</h1>
                    <form onSubmit={handleSubmitLogin}>
                        <div>
                            <label>שם משתמש:</label>
                            <input
                            type="text"
                            value={usernameLogin}
                            onChange={handleUsernameLoginChange}
                            />
                        </div>
                        <div>
                            <label>סיסמה:</label>
                            <input
                            type="password"
                            value={passwordLogin}
                            onChange={handlePasswordLoginChange}
                            />
                        </div>
                        <button type="submit">כניסה</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default LoginLayouts;
