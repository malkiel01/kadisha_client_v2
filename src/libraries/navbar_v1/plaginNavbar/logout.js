import React, { useContext } from 'react'
import { GlobalContext } from '../../../App'
import { logout } from '../../../database/queries/connectedQueries'

function Logout() {
  const { token, setToken, setPermission } = useContext(GlobalContext)

  return (
    <div
    onClick={() => {
      logout(token, setToken, setPermission)
      
    }}
    style={{   
      direction:'rtl',
      textAlign: 'right',
      width: '100%', /* כל הרוחב של הקונטיינר */
      height: '100%', /* כל הגובה של הקונטיינר */
    }}>
      <span>יציאה</span>
  </div>
  )
}

export default Logout
