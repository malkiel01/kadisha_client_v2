import useDocuments from "./useDocuments"

const useDocManager = () => {
  const { createPDF } = useDocuments()

  const formatDate = () => {
    const now = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return now.toLocaleDateString('en-GB', options);
  };
  
  const docConsular = (data, document, nameFile) => {
    console.log(data, document, nameFile);
    const fieldsToPlace = [
      { fieldName: 'Serial Number', content: data?.serialNumber.toString() || '', x: 255, y: 705 },
      { fieldName: 'date', content: formatDate() || '', x: 35, y: 690 },
      { fieldName: 'Attention', content: ' ', x: 120, y: 639 },
      { fieldName: 'Deceased Name', content: data?.name?.toString() || '', x: 182, y: 511 },
      { fieldName: 'Block', content: data?.block?.toString() || '', x: 125, y: 470 },
      { fieldName: 'Plot', content: data?.plot?.toString() || '', x: 118, y: 448 },
      { fieldName: 'Row', content: data?.row?.toString() || '', x: 128, y: 428 },
      { fieldName: 'Grave', content: data?.grave?.toString() || '', x: 120, y: 407 },
      { fieldName: 'Cemetery', content: data?.cemetery?.toString() || '', x: 117, y: 385 },
      { fieldName: 'Deed', content: data?.deep?.toString() || '', x: 180, y: 343 }
    ]
    createPDF(fieldsToPlace, document, nameFile)
  }

  const docDeep = (data, document, nameFile) => {
    const fieldsToPlace = [
      { fieldName: 'Serial Number', content: data?.serialNumber.toString() || '', x: 375, y: 360 },
      { fieldName: 'Deceased Name', content: data?.name?.toString() || '', x: 305, y: 330 },
      { fieldName: 'Number Id', content: data?.numId?.toString() || '', x: 250, y: 310 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 410, y: 310 },
      { fieldName: 'Cemetery', content: data?.cemetery?.toString() || '', x: 420, y: 288 },
      { fieldName: 'Block', content: data?.block?.toString() || '', x: 275, y: 268 },
      { fieldName: 'Plot', content: data?.plot?.toString() || '', x: 371, y: 268 },
      { fieldName: 'Row', content: data?.row?.toString() || '', x: 480, y: 268 },
      { fieldName: 'Grave', content: data?.grave?.toString() || '', x: 590, y: 268 },
      // { fieldName: 'date', content: formatDate() || '', x: 35, y: 690 },
      // { fieldName: 'Attention', content: ' ', x: 120, y: 639 },
      // // { fieldName: 'Cemetery', content: 'Har Hazeitim', x: 117, y: 385 },
      // { fieldName: 'Deed', content: data?.deep?.toString() || '', x: 180, y: 343 }
    ]
    createPDF(fieldsToPlace, document, nameFile)
  }

  const docPurchase = (data, document, nameFile) => {
    
    const fieldsToPlace = [
      { fieldName: 'Serial Number', content: data?.serialNumber || '', x: 285, y: 693 },

      { fieldName: 'Last Name', content: data?.lastName || '', x: 92, y: 634 },
      { fieldName: 'Name Father', content: data?.nameFather || '', x: 252, y: 634 },
      { fieldName: 'Gender', content: data?.gender || '', x: 412, y: 634 },

      { fieldName: 'First Name', content: data?.firstName || '', x: 83, y: 611 },
      { fieldName: 'Name Mother', content: data?.nameMother || '', x: 250, y: 611 },
      { fieldName: 'Marital Status', content: data?.maritalStatus || '', x: 430, y: 611 },

      { fieldName: 'Number Id', content: data?.numId || '', x: 87, y: 588 },
      { fieldName: 'Date Birth', content: data?.dateBirth || '', x: 286, y: 588 },
      { fieldName: 'association', content: data?.association || '', x: 407, y: 588 },

      { fieldName: 'Old Name', content: data?.oldName || '', x: 112, y: 565 },
      { fieldName: 'dateBirthHe', content: data?.dateBirthHe || '', x: 282, y: 565 },

      { fieldName: 'Address', content: data?.address || '', x: 69, y: 506 },
      { fieldName: 'City', content: data?.city || '', x: 232, y: 506 },
      { fieldName: 'Country', content: data?.country || '', x: 410, y: 506 },

      { fieldName: 'Phone', content: data?.phone || '', x: 70, y: 448 },
      { fieldName: 'Phone Mobile', content: data?.phoneMobile || '', x: 245, y: 448 },

      { fieldName: 'Contact Name', content: data?.contactName || '', x: 105, y: 390 },
      { fieldName: 'Contact Id', content: data?.contactId || '', x: 425, y: 390 },

      { fieldName: 'kinship', content: data?.kinship || '', x: 73, y: 366 },
      { fieldName: 'Contact Phone', content: data?.contactPhone || '', x: 242, y: 366 },
      { fieldName: 'Contact Phone Mobile', content: data?.contactPhoneMobile || '', x: 418, y: 366 },

      { fieldName: 'Cemetery', content: data?.cemetery || '', x: 92, y: 307 },
      { fieldName: 'Block', content: data?.block || '', x: 235, y: 307 },
      { fieldName: 'Plot', content: data?.plot || '', x: 413, y: 307 },

      { fieldName: 'Row', content: data?.row || '', x: 72, y: 286 },
      { fieldName: 'Grave', content: data?.grave || '', x: 234, y: 286 },
      { fieldName: 'plotType', content: data?.plotType?.toString() || '', x: 428, y: 286 },

      { fieldName: 'date', content: formatDate() || '', x: 100, y: 262 },
      { fieldName: 'price', content: data?.price || '' , x: 270, y: 262 },

      // // { fieldName: 'Cemetery', content: 'Har Hazeitim', x: 117, y: 385 },
      // { fieldName: 'Deed', content: data?.deep?.toString() || '', x: 180, y: 343 }
    ]
    createPDF(fieldsToPlace, document, nameFile)
  }
  const docPurchase2 = (data, document, nameFile) => {
    const fieldsToPlace = [
      { fieldName: 'Serial Number', content: data?.serialNumber.toString() || '', x: 285, y: 693 },

      { fieldName: 'Last Name', content: data?.lastName?.toString() || '', x: 92, y: 634 },
      { fieldName: 'First Name', content: data?.firstName?.toString() || '', x: 83, y: 611 },
      { fieldName: 'Number Id', content: data?.numId?.toString() || '', x: 87, y: 588 },
      { fieldName: 'Old Name', content: data?.oldName?.toString() || '', x: 112, y: 565 },

      { fieldName: 'Name Father', content: data?.nameFather?.toString() || '', x: 252, y: 634 },
      { fieldName: 'Name Mother', content: data?.nameMother?.toString() || '', x: 250, y: 611 },
      { fieldName: 'Date Birth', content: data?.dateBirth?.toString() || '', x: 286, y: 588 },
      { fieldName: 'Old Name', content: data?.oldName?.toString() || '', x: 282, y: 565 },

      { fieldName: 'Name Father', content: data?.nameFather?.toString() || '', x: 412, y: 634 },
      { fieldName: 'Name Mother', content: data?.nameMother?.toString() || '', x: 430, y: 611 },
      { fieldName: 'Date Birth', content: data?.dateBirth?.toString() || '', x: 407, y: 588 },

      { fieldName: 'Address', content: data?.address?.toString() || '', x: 69, y: 506 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 232, y: 506 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 410, y: 506 },

      { fieldName: 'Address', content: data?.address?.toString() || '', x: 70, y: 448 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 245, y: 448 },

      { fieldName: 'Address', content: data?.address?.toString() || '', x: 105, y: 390 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 425, y: 390 },

      { fieldName: 'Address', content: data?.address?.toString() || '', x: 73, y: 366 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 242, y: 366 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 418, y: 366 },

      { fieldName: 'Cemetery', content: data?.cemetery?.toString() || '', x: 92, y: 307 },
      { fieldName: 'Block', content: data?.block?.toString() || '', x: 235, y: 307 },
      { fieldName: 'Plot', content: data?.plot?.toString() || '', x: 413, y: 307 },

      { fieldName: 'Row', content: data?.row?.toString() || '', x: 72, y: 286 },
      { fieldName: 'Grave', content: data?.grave?.toString() || '', x: 234, y: 286 },
      { fieldName: 'plotType', content: data?.plotType?.toString() || '', x: 428, y: 286 },

      { fieldName: 'date', content: formatDate() || '', x: 100, y: 262 },
      { fieldName: 'price', content: data?.price?.toString(), x: 270, y: 262 },

      // // { fieldName: 'Cemetery', content: 'Har Hazeitim', x: 117, y: 385 },
      // { fieldName: 'Deed', content: data?.deep?.toString() || '', x: 180, y: 343 }
    ]
    createPDF(fieldsToPlace, document, nameFile)
  }

  const docBurial = (data, document, nameFile) => {
    const fieldsToPlace = [
      { fieldName: 'Serial Number', content: data?.serialNumber.toString() || '', x: 285, y: 693 },

      { fieldName: 'Last Name', content: data?.lastName?.toString() || '', x: 92, y: 634 },
      { fieldName: 'First Name', content: data?.firstName?.toString() || '', x: 83, y: 611 },
      { fieldName: 'Number Id', content: data?.numId?.toString() || '', x: 87, y: 588 },
      { fieldName: 'Old Name', content: data?.oldName?.toString() || '', x: 112, y: 565 },

      { fieldName: 'Name Father', content: data?.nameFather?.toString() || '', x: 252, y: 634 },
      { fieldName: 'Name Mother', content: data?.nameMother?.toString() || '', x: 250, y: 611 },
      { fieldName: 'Date Birth', content: data?.dateBirth?.toString() || '', x: 286, y: 588 },
      { fieldName: 'Old Name', content: data?.oldName?.toString() || '', x: 282, y: 565 },

      { fieldName: 'Name Father', content: data?.nameFather?.toString() || '', x: 412, y: 634 },
      { fieldName: 'Name Mother', content: data?.nameMother?.toString() || '', x: 430, y: 611 },
      { fieldName: 'Date Birth', content: data?.dateBirth?.toString() || '', x: 407, y: 588 },

      { fieldName: 'Address', content: data?.address?.toString() || '', x: 69, y: 506 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 232, y: 506 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 410, y: 506 },

      { fieldName: 'Address', content: data?.address?.toString() || '', x: 70, y: 448 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 245, y: 448 },

      { fieldName: 'Address', content: data?.address?.toString() || '', x: 105, y: 390 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 425, y: 390 },

      { fieldName: 'Address', content: data?.address?.toString() || '', x: 73, y: 366 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 242, y: 366 },
      { fieldName: 'Address', content: data?.address?.toString() || '', x: 418, y: 366 },

      { fieldName: 'Cemetery', content: data?.cemetery?.toString() || '', x: 92, y: 307 },
      { fieldName: 'Block', content: data?.block?.toString() || '', x: 235, y: 307 },
      { fieldName: 'Plot', content: data?.plot?.toString() || '', x: 413, y: 307 },

      { fieldName: 'Row', content: data?.row?.toString() || '', x: 72, y: 286 },
      { fieldName: 'Grave', content: data?.grave?.toString() || '', x: 234, y: 286 },
      { fieldName: 'plotType', content: data?.plotType?.toString() || '', x: 428, y: 286 },

      { fieldName: 'date', content: formatDate() || '', x: 100, y: 262 },
      { fieldName: 'Attention', content: 'rrr', x: 270, y: 262 },

      // // { fieldName: 'Cemetery', content: 'Har Hazeitim', x: 117, y: 385 },
      // { fieldName: 'Deed', content: data?.deep?.toString() || '', x: 180, y: 343 }
    ]
    createPDF(fieldsToPlace, document, nameFile)
  }

  return {
    docConsular,
    docDeep,
    docPurchase,
    docBurial
  }
}

export default useDocManager;