import React, { useContext } from 'react'
import { GlobalContextCemetery } from '../../Block'

const CemeteryDetailDocuments = () => {
    const { formSectionsCemetery } = useContext(GlobalContextCemetery)

    // formSectionsCemetery
    return (
        <div>
            CemeteryDetailDocuments
            {JSON.stringify(formSectionsCemetery)}
            <p></p>
        </div>
    );
}

export default CemeteryDetailDocuments;
