import React from 'react';
import useDocuments from '../../database/documents/useDocuments';

const Home = () => {
    const { createPDFConsular,
        //  sendFormData 
        } = useDocuments()

    const fieldsToPlace = [
        { fieldName: 'Serial Number', content: '6205', x: 255, y: 705 },
        { fieldName: 'date', content: '05/02/2024', x: 35, y: 690 },
        { fieldName: 'Attention', content: ' ', x: 120, y: 639 },
        { fieldName: 'Deceased Name', content: 'ZEITOUN KRIEF Dolly Daia Ida', x: 182, y: 511 },
        { fieldName: 'Block', content: '2', x: 125, y: 470 },
        { fieldName: 'Plot', content: '2A', x: 118, y: 448 },
        { fieldName: 'Row', content: '05', x: 128, y: 428 },
        { fieldName: 'Grave', content: '9', x: 120, y: 407 },
        { fieldName: 'Cemetery', content: 'Givat Shaull', x: 117, y: 385 },
        { fieldName: 'Deed', content: '------', x: 180, y: 343 }
    ]


    const e = () => {
        console.log('step 0');
        createPDFConsular(fieldsToPlace)
        // createPDFConsular
        // sendFormData
    }

    return (
        <div>
            <button onClick={e} >test 2</button>
        </div>
    );
}

export default Home;
