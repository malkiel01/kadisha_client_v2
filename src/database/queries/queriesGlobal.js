import { useContext } from 'react';
import { GlobalContext } from '../../App';

const useGlobalQueries = () => {

    const getNameEntities = (entities = [], name) => {
        // בדיקה האם המערך אינו ריק
        if (entities.length > 0) {
            // מפיל את המערך לאובייקטים שיש להם את המאפיין 'name'
            const filteredEntities = entities.filter(item => item.hasOwnProperty(name));
            // אם יש אובייקטים שעברו את הסינון, ממשיך למיפוי
            if (filteredEntities.length > 0) {
                return filteredEntities.map(item => ({
                    'key': item['id'].toString(),
                    'value': item[name]
                }));
            }
        }
        // במקרה שהמערך ריק או שאף אובייקט לא עבר את הסינון, מחזיר מערך ריק
        return [];
    }
    


    return { 
        getNameEntities
     }
};

export default useGlobalQueries;
