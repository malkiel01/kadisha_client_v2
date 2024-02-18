import axios from "axios"

const URL = `http://localhost:3001/`

export const login = async (data, {setToken, setPermission}) => {
  let username = data.usernameLogin
  let password = data.passwordLogin

  // המלצה לבדיקה
  // let username = data?.usernameLogin || null
  // let password = data?.passwordLogin || null

    // בדיקה שנתוני ההתחברות אינם ריקים
    if (username && username !== '' && password && password !== '') {
        // נסיון גישה לשרת להתחברות
        try {
            const response = await axios.post(URL + `connection/login`, { username, password })

            // אם השרת אישר את הכניסה, יחזיר טוקן והרשאה
            // צפי חזרת אקסס היא אמת או שקר
            if (response.data.success) {
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('permission', response.data.permission)
              console.log(response.data.token);
              setToken(response.data.token)
              setPermission(response.data.permission)
              return true
            } else {
              localStorage.setItem('token', '')
              localStorage.setItem('permission', '')
              setToken('')
              setPermission('')

              alert('כניסה נכשלה. אנא נסה שוב.');
            }
          } catch (error) {
            localStorage.setItem('token', '')
            localStorage.setItem('permission', '')
            setToken('')
            setPermission('')
            alert('שגיאה בבקשה לשרת. אנא נסה שוב מאוחר יותר.');
          }
          return false
    }
}
export const registration = async (data, setToken) => {
    let username = data.usernameSignin
    let password = data.passwordSignin

 
    // if (data && data.username && data.username != '' && data.password && data.password != '') {
    if (username && username !== '' && password && password !== '') {
        try {
            // אפשר להשתמש ב axios בכדי לשלוח את שם המשתמש והסיסמה לשרת
            const response = await axios.post(`http://localhost:3001/connection/registration`, { 
                username, password
             })

             console.log(response);
      
            // אם השרת אישר את הכניסה, נכניס את המשתמש לאזור האישי
            if (response.data.success) {
              // כאן תוכל להשתמש בניווט לדף הרלוונטי
            //   console.log(response)
              // token = response.data
              localStorage.setItem('token', response.data)
              setToken(response.data)
            } else {
              alert('כניסה נכשלה. אנא נסה שוב.');
            }
          } catch (error) {
            console.error(error);
            alert('שגיאה בבקשה לשרת. אנא נסה שוב מאוחר יותר.');
          }
    }
}
export const logout = async (token, setToken, setPermission) => {
        console.log('token old: ',token)

        // נסיון גישה לשרת להתחברות
        try {
            // אפשר להשתמש ב axios בכדי לשלוח את שם המשתמש והסיסמה לשרת
            const response = await axios.post(`http://localhost:3001/connection/logout`, { token })

            // אם השרת אישר את הכניסה, ימחק טוקן והרשאה
            // צפי חזרת אקסס היא אמת או שקר
            if (response.data.success) {
              console.log('נותקת בהצלחה')
              localStorage.setItem('token', '')
              localStorage.setItem('permission', '')
              setToken('')
              setPermission('')
            } else {
              alert('כניסה נכשלה. אנא נסה שוב.');
            }
          } catch (error) {
            console.error(error);
            alert('שגיאה בבקשה לשרת. אנא נסה שוב מאוחר יותר.');
          }
}
export const checkToken = async (token, setToken) => {
  if (token && token !== '') {
      axios.post(`http://localhost:3001/connection/check_token` , {token
      })
      .then((response) => {
        console.log(response.data);
          if (response.data.success) {
            if (response.data.timer < 60) {
            // if (response.data.timer < 60 && response.data.timer > 50) {
              alert('בעוד דקה המערכת תתנתק')
              // console.log('בעוד דקה המערכת תתנתק')
            }  
          } else {
            setToken('')
            localStorage.setItem('token', '')
            localStorage.setItem('permission', 'null')
          }
          // if (!response.data.success) {
          //   setToken('')
          //   localStorage.setItem('token', '')
          //   localStorage.setItem('permission', 'null')
          // }
      })
      .catch((err) => {
          console.log(err.response)
      })
  }






    // if (token !== '') {
    //     try {
    //         // אפשר להשתמש ב axios בכדי לשלוח את שם המשתמש והסיסמה לשרת
    //         const response = await axios.post(`http://localhost:3001/connection/check_token`, { 
    //           token
    //          })
      
    //         // אם השרת אישר את הכניסה, נכניס את המשתמש לאזור האישי
    //         if (response.data.success) {
    //           // כאן תוכל להשתמש בניווט לדף הרלוונטי
    //           if (response.data.timer) {
    //             alert('עוד 5 דקות תתנתק')
    //           }} else {
    //           alert('התנתקת מהמערכת');
    //         }
    //       } catch (error) {
    //         alert('שגיאה בבקשה לשרת. אנא נסה שוב מאוחר יותר.');
    //       }
    // }
}



