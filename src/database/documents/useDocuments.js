import { useContext } from 'react'
import { GlobalContext } from '../../App'
import axios from 'axios';
import { saveAs } from 'file-saver';
import { AddItem, GetAllItems } from '../queriesTest/CRUD_Queries';

const URL = `http://localhost:3001/`

const URL_CREATE_DOCUMENTS = `api/documents`

const useDocuments = () => {
  const { token } = useContext(GlobalContext)

  // Test -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --
  const GetDocuments = async (url, data, { token },
    isPending = () => { }, getData = () => { }, isError = () => { }
  ) => {
    // Start the request
    isPending(true);

    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let blob = await response.blob();
      getData(blob);
    } catch (error) {
      isError(error.message);
    } finally {
      isPending(false);
    }
  }

  const createPDFConsular = async (data) => {
    console.log('step 1');
    let url = 'http://localhost:3001/api/documents/consular';

    let isPending = (pending) => {
      console.log(pending ? 'בטעינה...' : 'סיים טעינה');
    };

    let getData = (blob) => {
      // Create a Blob from the PDF Stream
      const file = new Blob([blob], { type: 'application/pdf' });
      // Trigger the file download
      saveAs(file, 'אישור קונסולרי ' + data[0].content + '.pdf');
    };

    let isError = (err) => {
      console.error('שגיאה: ', err);
    }
    GetDocuments(url, data, { token },
      isPending,
      getData, isError
    )
  };


  // function sendFormData(fieldsToPlace) {
  //   const fields = fieldsToPlace

  //   axios.post('http://localhost:3001/api/documents/consular', fields, { responseType: 'blob' })
  //     .then(response => {
  //       // Create a Blob from the PDF Stream
  //       const file = new Blob(
  //         [response.data],
  //         { type: 'application/pdf' }
  //       );

  //       // Trigger the file download using the saveAs function from file-saver
  //       saveAs(file, 'filled_form.pdf');
  //     })
  //     .catch(error => {
  //       console.error('There was an error!', error);
  //     });
  // }


  return {
    createPDFConsular,
    // sendFormData
  }
}

export default useDocuments;
