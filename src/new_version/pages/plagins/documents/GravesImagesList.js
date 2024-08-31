import axios from 'axios';

export const fetchFiles = async (url, token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/documents/getFiles`, {
            url,
            token
        });
        if (response.data.success) {
            return response.data.files.map((file, index) => ({
                id: index + 1,
                src: `https://mbe-plus.com/kadishaV1/kadisha_1${url}/${file}`,
                fileName: file,
                handleClick: () => {
                    const downloadUrl = `https://mbe-plus.com/kadishaV1/kadisha_1${url}/${file}`;
                 
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = file; // ניתן להגדיר שם קובץ להורדה אם רוצים
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }));
        } else {
            console.error('Failed to fetch files. Token might be invalid.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching files:', error);
        return [];
    }
};

export const fetchFilesNoWorking1 = async (url, token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/documents/getFiles`, {
            url,
            token
        });
        if (response.data.success) {
            return response.data.files.map((file, index) => {
                const originalUrl = `https://mbe-plus.com/kadishaV1/kadisha_1${url}/${file}`;
                const proxyUrl = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/proxy?url=${encodeURIComponent(originalUrl)}`;
                
                return {
                    id: index + 1,
                    src: proxyUrl,
                    fileName: file,
                    handleClick: () => {
                        console.log(`Downloading: ${originalUrl}`);
                        
                        const link = document.createElement('a');
                        link.href = originalUrl;
                        link.download = file; // ניתן להגדיר שם קובץ להורדה אם רוצים
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                };
            });
        } else {
            console.error('Failed to fetch files. Token might be invalid.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching files:', error);
        return [];
    }
};


