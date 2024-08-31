import { useContext } from 'react';
import { GlobalContext } from '../../../App';

const useGeneralQueries = () => {
    const { token, setLoading, setNameBlocks, setDataBlocks } = useContext(GlobalContext)

    const extractAndSaveData = (key, data, father = '') => {
        return data
            ? data.map(item => {
                return { 'key': item['id'].toString(), 'father' : item[father] , 'value': item[key] }; // שימוש ב-[id] כדי להציב את ערך id כמפתח
            }).filter(name => name != null)
            : null;
    };
    // קבלת כל הרשומות
    const AllData = (url, nameData, nameColume) => {

        let isError = (err) => {
            if (err) {
                console.log('שגיאה: ', err);
            }
        }
        let isPending = (pending) => {
            ((localStorage.getItem(nameData) === null) || !pending) && setLoading(pending)
            console.log(pending ? 'בטעינה...' : 'סיים טעינה');

        }
        let getData = (response) => {
            localStorage.setItem(nameData, JSON.stringify(response))
            setDataBlocks(response)

            let filterName = extractAndSaveData(nameColume, response)
            localStorage.setItem(nameData, JSON.stringify(filterName))
            setNameBlocks(filterName)
        }
        GetAllItems(url, { token },
            isPending,
            getData, isError
        )
    }

    // קבלת כל הרשומות
    const GetAllItems = async (url, { token },
        isPending = () => { }, getData = () => { }, isError = () => { }
    ) => {
        isPending(true)

        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token })
        }).then(res => {
            if (!res.ok) {
                throw Error('test error', res)
            }
            if (!res) {
                throw Error('test error 2')
            }
            return res?.json()
        }).then(resData => {
            getData(resData)
            isError(false)
            isPending(false)
        })
            .catch(err => {
                isError(err.message)
                isPending(false)
            })
    }

    // הוספת ו/או עדכון רשומה חדשה
    const AddItem = async (url, data, { token },
        isPending = () => { }) => {
        isPending(true) 
        if (data?.id) {
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...data, token })
                }).then(res => {
                    if (!res.ok) {
                        reject('test error')
                    }
                    if (!res) {
                        reject('test error 2')
                    }
                    resolve(res)
                })
                    .catch(err => {
                        reject(err)
                    })
              })
            
        } else {
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...data, token })
                }).then(res => {
                    if (!res.ok) {
                        reject('test error')
                    }
                    if (!res) {
                        reject('test error 2')
                    }
                    resolve(res)
                })
                    .catch(err => {
                        reject(err)
                    })
              })
        }
    }

    // setAllItems
    const setAllItems = async (url, data, { token },
        isPending = () => { }, isError = () => { },
        callbacks
    ) => {
        isPending(true)

        console.log('step 1 add - ',data );

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data, token })
            }).then(res => {
                if (!res.ok) {
                    reject('test error')
                }
                if (!res) {
                    reject('test error 2')
                }
                resolve(res)
            })
                .catch(err => {
                    reject(err)
                })
          })
    }

    // מחיקת רשומה ספציפית
    const RemoveItem = async (url, id, { token },
        isPending = () => { }, isError = () => { }
    ) => {
        isPending(true)
        await fetch(url, {
            // method: 'PUT',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, token: token })
        }).then(res => {
            if (!res.ok) {
                throw Error('test error')
            }
            if (!res) {
                throw Error('test error 2')
            }
            isError(false)
            isPending(false)
        })
            .catch(err => {
                isError(err.message)
                isPending(false)
            })
    }

    return { extractAndSaveData, AllData, GetAllItems, AddItem, setAllItems, RemoveItem };
};

export default useGeneralQueries;
