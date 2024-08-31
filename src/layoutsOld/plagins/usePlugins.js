// -------------------------------------

import axios from 'axios';
import { saveAs } from 'file-saver';

// -------------------------------------

const usePlugins = () => {
    function sendFormDataPDF() {
        // Define the data you want to send
        const fields = {
          name: 'John Doe',
          number: '1234',
        };
      
        axios.post('http://localhost:3001/api/blocks/addBlock', fields, { responseType: 'blob' })
        .then(response => {
           // Create a Blob from the PDF Stream
           const file = new Blob(
            [response.data], 
            { type: 'application/pdf' }
          );
          
          // Trigger the file download using the saveAs function from file-saver
          saveAs(file, 'filled_form.pdf');
        })
        .catch(error => {
          console.error('There was an error!', error);
        });

      }

    return (
        sendFormDataPDF
    )
}
    

export default usePlugins