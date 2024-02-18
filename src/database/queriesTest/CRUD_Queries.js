import axios from "axios"
     
// ----- * ----- * ----- * ----- * ----- * ----- * ----- * ----- * ----- * ----- * ----- * ----- * ----- * ----- * ----- * ----- * ----- * 
            
const QUERY_ADD_CEMETERIES = `http://localhost:3001/api/add-cemeteries` 
const QUERY_ADD_BLOCKS = `http://localhost:3001/api/blocks/add-blocks` 

export const AddCemeteries = (data, {token}) => {
    if (data) {
        axios.post(QUERY_ADD_CEMETERIES , {
            cemeteries: [
                {
                    cemeteryNameHe: 'data.cemeteryNameHe || null3',
                    cemeteryNameEn: data.cemeteryNameEn || null, 
                    nationalInsuranceCode: data.nationalInsuranceCode || null, 
                    cemeteryCode: data.cemeteryCode || null, 
                    coordinates: data.coordinates || null, 
                    address: data.address || null, 
                    documents: data.documents || null, 
                    contactName: data.contactName || null, 
                    contactPhoneName: data.contactPhoneName || null,
                },
                {
                    cemeteryNameHe: 'data.cemeteryNameHe || null2',
                    cemeteryNameEn: data.cemeteryNameEn || null, 
                    nationalInsuranceCode: data.nationalInsuranceCode || null, 
                    cemeteryCode: data.cemeteryCode || null, 
                    coordinates: data.coordinates || null, 
                    address: data.address || null, 
                    documents: data.documents || null, 
                    contactName: data.contactName || null, 
                    contactPhoneName: data.contactPhoneName || null,
                },
                {
                    cemeteryNameHe: 'data.cemeteryNameHe || null1',
                    cemeteryNameEn: data.cemeteryNameEn || null, 
                    nationalInsuranceCode: data.nationalInsuranceCode || null, 
                    cemeteryCode: data.cemeteryCode || null, 
                    coordinates: data.coordinates || null, 
                    address: data.address || null, 
                    documents: data.documents || null, 
                    contactName: data.contactName || null, 
                    contactPhoneName: data.contactPhoneName || null,
                },
                {
                    cemeteryNameHe: 'data.cemeteryNameHe || null1',
                    cemeteryNameEn: data.cemeteryNameEn || null, 
                    nationalInsuranceCode: data.nationalInsuranceCode || null, 
                    cemeteryCode: data.cemeteryCode || null, 
                    coordinates: data.coordinates || null, 
                    address: data.address || null, 
                    documents: data.documents || null, 
                    contactName: data.contactName || null, 
                    contactPhoneName: data.contactPhoneName || null,
                },
                {
                    cemeteryNameHe: 'data.cemeteryNameHe || null1',
                    cemeteryNameEn: data.cemeteryNameEn || null, 
                    nationalInsuranceCode: data.nationalInsuranceCode || null, 
                    cemeteryCode: data.cemeteryCode || null, 
                    coordinates: data.coordinates || null, 
                    address: data.address || null, 
                    documents: data.documents || null, 
                    contactName: data.contactName || null, 
                    contactPhoneName: data.contactPhoneName || null,
                },
                {
                    cemeteryNameHe: 'data.cemeteryNameHe || null1',
                    cemeteryNameEn: data.cemeteryNameEn || null, 
                    nationalInsuranceCode: data.nationalInsuranceCode || null, 
                    cemeteryCode: data.cemeteryCode || null, 
                    coordinates: data.coordinates || null, 
                    address: data.address || null, 
                    documents: data.documents || null, 
                    contactName: data.contactName || null, 
                    contactPhoneName: data.contactPhoneName || null,
                },
                {
                    cemeteryNameHe: 'data.cemeteryNameHe || null1',
                    cemeteryNameEn: data.cemeteryNameEn || null, 
                    nationalInsuranceCode: data.nationalInsuranceCode || null, 
                    cemeteryCode: data.cemeteryCode || null, 
                    coordinates: data.coordinates || null, 
                    address: data.address || null, 
                    documents: data.documents || null, 
                    contactName: data.contactName || null, 
                    contactPhoneName: data.contactPhoneName || null,
                },
            ],
            token: token
        })
        .then((response) => {
            console.log(response)
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err.response)
        })
    }
}

export const AddBlocks = (data, {token}) => {
    if (data) {
        axios.post(QUERY_ADD_BLOCKS , {
            blocks: [
                {
                    blockNameHe: data.blockNameHe || '', 
                    blockNameEn: data.blockNameEn || '', 
                    blockLocation: data.blockLocation || '', 
                    nationalInsuranceCode: data.nationalInsuranceCode || '', 
                    blockCode: data.blockCode || '', 
                    comments: data.comments || '', 
                    coordinates: data.coordinates || '',
                    documentsList: data.documentsList || '', 
                    cemeteryId: data.cemeteryId || '',
                }
            ],
            token: token
        })
        .then((response) => {
            console.log(response)
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err.response)
        })
    }
}

// הפונקציה לקבלת הקבר לפי ה-id
export const getCemeteryById = (id = null, {token}) => {
    if (id) {
        id = '88'
    }
    const url = `http://localhost:3001/api/getCemeteryById`; // URL שבו מארח השרת את הפונקציה הרלוונטית בשרת
    axios.post(url, 
        {
        params: {
            id: id,
            token: token
        }
    }
    )
    .then(response => {
        // מקבל תשובה מהשרת
        console.log(response)
    })
    .catch(err => {
        console.log(err.response)
    });
};
// הפונקציה לקבלת הקבר לפי ה-id
