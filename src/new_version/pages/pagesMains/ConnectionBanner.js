import React, { useState, useEffect } from 'react';
import { Alert, Container } from '@mui/material';

function ConnectionBanner() {
  const connection = localStorage.getItem('connection')
    const [connectionInfo, setConnectionInfo] = useState(null)

    useEffect(() => {
        function handleStorageChange() {
            const connectionData = connection ? JSON.parse(connection) : { active: false };
            if (connectionData?.active) {
                setConnectionInfo(connectionData)
            } else {
                setConnectionInfo(null)
            }
        }

        // רישום לאירוע שינוי ב-LocalStorage
        window.addEventListener('storage', handleStorageChange)

        // קריאה ראשונית לנתונים בעת טעינת הקומפוננטה
        handleStorageChange();

        // ניקוי והסרת האזנה לאירוע בעת סיום חיי הקומפוננטה
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, [connection]);


    // רק אם יש מידע על חיבור וה-nretries שונה מ-0 נציג את ה-Alert
    if (connectionInfo && connectionInfo?.active === true) {
    // if (connectionInfo && connectionInfo.retries !== 0) {
        return (
            <Container style={{position: 'absolute', top: 0, zIndex: 5_000}}>
                <Alert severity="error" style={{ marginTop: 20 }}>
                    {connectionInfo?.msg}
                    {/* תקלת תקשורת... נסיון {connectionInfo.retries} יבוצע בעוד {timer} */}
                </Alert>
            </Container>
        );
    } else {
        return null;
    }
}

export default ConnectionBanner;
