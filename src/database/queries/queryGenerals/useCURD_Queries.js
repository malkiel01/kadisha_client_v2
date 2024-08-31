import { useContext, useState } from "react";
import { GlobalContext } from "../../../App";
import useGeneralQueries from "./useGeneralQueries";

const useCURD_Queries = () => {
    const { token, setToken, setLoading } = useContext(GlobalContext)
    const { AddItem, setAllItems, RemoveItem } = useGeneralQueries();

    // פונקציה לקבלת ערכים
    const AllDataEntities = async (url) => {
        const maxRetries = 20 // מספר הפעמים להפעלת הפונקציה שניגשת לשרת
        let res = null // הערך המוחזר מהשרת, או מערך ריק במקרה של תקלה

        setLoading(true); // מעדכן את האפליקציה שמתחילים טעינת נתונים

        // פונקציה אסיכרונית המפעילה לופ לקבלת ערכים מהשרת
        async function asyncDoWhileLoop() {
            // הפעלת פונקציית לולאה המקבלת את הערכים מהשרת
            async function loop() {
                res = [] // עדכון למערך ריק, מערך ריק מונע הפעלת הפונקציה בשנית
                let access = false // מתעדכן במצב בו השרת הצליח להחזיר ערכים
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token: token })
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    let resData = await response.json()

                    // בדיקה אם resData הוא מערך
                    if (!Array.isArray(resData)) {
                        resData = []; // ניתן להחליט על טיפול אחר
                    }

                    localStorage.setItem('connection', JSON.stringify({ active: false }))
                    res = { resData }
                } catch (error) {
                    for (let index = maxRetries; index >= 1; index--) {

                        try {
                            const response = await fetch(url, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ token: token })
                            });

                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }

                            let resData = await response.json();

                            // בדיקה אם resData הוא מערך
                            if (!Array.isArray(resData)) {
                                console.error('resData אינו מערך');
                                resData = []; // ניתן להחליט על טיפול אחר
                            }
                            
                            console.log('סיים טעינה');

                            localStorage.setItem('connection', JSON.stringify({ active: false }))
                            res = { resData }
                            // access = true
                            break; // יציאה מהלולאה אם test שונה מ-null
                        } catch (error) {
                            localStorage.setItem('connection', JSON.stringify({ msg: `תקלת התחברות, מנסה שוב בעוד ${index}`, active: true }))
                        }

                        await new Promise(resolve => setTimeout(resolve, 5000)); // המתנה של 5 שניות בין כל איטרציה
                    }

                    if (access) {
                        localStorage.setItem('connection', JSON.stringify({ active: false }))
                    } else {
                        localStorage.setItem('connection', JSON.stringify({ msg: `המערכת מתנתקת...`, active: true }))

                        await new Promise(resolve => setTimeout(resolve, 5000)); // המתנה של 5 שניות בין כל איטרציה

                        localStorage.removeItem('token')
                        localStorage.removeItem('connection')
                        setToken(null)
                        localStorage.setItem('connection', JSON.stringify({ active: false }))
                    }

                } finally {
                    setLoading(false)
                }
            }
            await new Promise(resolve => setTimeout(resolve, 20000)); // המתנה של 5 שניות בין כל איטרציה

            // הפעלת הפונקציה בפעם הראשונה, לאחר מכן הערך משתנה ולא יהיה ריק
            if (res === null) {
                await loop()
            }
            // אם זו אינה פעם ראשונה, והערך אינו ריק, תשלח את הערך ללקוח
            else {
                return res
            }
        }

        // מפעיל את הפונקציה האסיכרונית שמפעילה את הלופ לקבלת ערכים מהשרת
        if (navigator.onLine) {
            await asyncDoWhileLoop()
        } else {
            localStorage.setItem('connection', JSON.stringify({ msg: 'אין חיבור לאינטרנט', active: true }))

            await new Promise(resolve => setTimeout(resolve, 50000)); // המתנה של 5 שניות בין כל איטרציה
        }
        return res
    }

    // הוספת נתון
    const addOrUpdateDataEntity = async (data, url) => {
        // החזרת הפרומיס מ-AddItem
        if (data?.id) {
            try {
                await AddItem(url, data, { token })
                return 200
            } catch (error) {
                console.error('שגיאה: ', error);
                throw error; // כדי שהשגיאה תוכל להתפס ב-addOrUpdateDataCemetery
            }
        } else {
            try {
                await AddItem(url, data, { token })
                console.log('סיים טעינה', data)
                return 200
            } catch (error) {
                console.error('שגיאה: ', error);
                throw error; // כדי שהשגיאה תוכל להתפס ב-addOrUpdateDataCemetery
            }
        }
    }

    const setAllData = async (data, url) => {
        // החזרת הפרומיס מ-AddItem
        try {
            await setAllItems(url, data, { token });
            console.log('סיים טעינה', data);
        } catch (error) {
            console.error('שגיאה: ', error);
            throw error; // כדי שהשגיאה תוכל להתפס ב-addOrUpdateDataCemetery
        }
    }

    // קבלת אב הנתון
    const getChildrensByFather = (id, data = [], father = '') => {
        if (data.length) {
            return data.filter(item => item[father] === id)
        }
        return []
    }

    // קבלת הרשומה עם האיידי
    const getEntityById = (id, data = []) => {
        return data.find(entity => entity.id === id);
    }

    // מחיקת נתון
    const removeEntity = async (data, url) => {
        if (data?.id) {
            try {
                console.log('step removeEntity: ',data);
                await RemoveItem(url, data, { token })
                return 200
            } catch (error) {
                console.error('שגיאה: ', error);
                throw error; // כדי שהשגיאה תוכל להתפס ב-removeEntity
            }
        }
    }

    return {
        AllDataEntities,
        setAllData,
        addOrUpdateDataEntity,
        getChildrensByFather,
        getEntityById,
        // getEntityByAttr,
        removeEntity
    }
};

export default useCURD_Queries;