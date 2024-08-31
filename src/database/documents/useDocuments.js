import { useContext } from 'react'
import { GlobalContext } from '../../App'
import { saveAs } from 'file-saver';

const URL = `${process.env.REACT_APP_API_URL}:3001/`
const URL_CREATE_DOCUMENTS = `api/documents`

const useDocuments = () => {
  const { token } = useContext(GlobalContext)

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

  const createPDF = async (data, document, nameFile) => {
    let url = `${URL}${URL_CREATE_DOCUMENTS}/${document}`

    let isPending = (pending) => {
      console.log(pending ? 'בטעינה...' : 'סיים טעינה');
    };

    let getData = (blob) => {
      // Create a Blob from the PDF Stream
      const file = new Blob([blob], { type: 'application/pdf' });
      // Trigger the file download
      saveAs(file, nameFile);
    };

    let isError = (err) => {
      console.error('שגיאה: ', err);
    }
    GetDocuments(url, data, { token },
      isPending,
      getData, isError
    )
  };

  return {
    createPDF,
  }
}

export default useDocuments;
