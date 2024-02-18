import React, { useContext, useEffect } from 'react'
import TemplateFormFloating from '../../libraries/forms_v4/templateFormFloating'
import useQueries from '../../database/useQueries';
import { GlobalContext } from '../../App';

// ------------------------------------------------------------------ validation ---------------------------------------------------------------


const CemeteryFormFloating = ({
    form = [], setForm = () => {}, 
    criteria=[], setCriteria = () => {}, 
    onSubmit = () => {}
}) => {


// * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - 
// * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - 

// ------------------------------------------------------------------ header ------------------------------------------------------------------
const close = { 
  id: 'btn-close',
  name: 'בתי העלמין',
  properties: {
      type: 'close',
  }
}
  
const header = [close]
// ------------------------------------------------------------------ content -----------------------------------------------------------------
// id
const segment = {
  id: 'id',
  name: 'id',
  defaultValue: '',
  properties: {
  type: 2,
  fullWidth: true,
  required: true,
  hidden: true
  }
}
// שם בית העלמין
const segment11 = {
      container: [
        // שם בית העלמין בעברית
        { 
          id: 'cemeteryNameHe',
          label: 'שם בית העלמין',
          name: 'cemeteryNameHe',
          defaultValue: '',
          // המשתנה אומר שלא ניתן לעדכון
          notUpdateData: true,
          properties: {
            type: 2,
            fullWidth: true,
            validationRequired: true,
            validationNotExists: [{id: 1154, value: 'הר המנוחות'},{id: 1155, value: 'rrrr'},]
          },
          grid: {
            xs: 12,
            md: 6
          }
        },
        // שם בית העלמין באנגלית
        {
          id: 'cemeteryNameEn',
          label: 'שם בית העלמין באנגלית',
          name: 'cemeteryNameEn',
          defaultValue: '',
          properties: {
            type: 2,
            fullWidth: true,
            validationRequired: true,
          },
          grid: {
            xs: 12,
            md: 6
          }
        }
      ],
      grid: {
        xs: 12,
        md: 12
      }
}
// שם בית העלמין
const segment1 = {
      // container: [
        // שם בית העלמין בעברית
        // { 
          id: 'cemeteryNameHe',
          label: 'שם בית העלמין',
          name: 'cemeteryNameHe',
          defaultValue: '',
          // המשתנה אומר שלא ניתן לעדכון
          notUpdateData: true,
          properties: {
            type: 2,
            fullWidth: true,
            validationRequired: true,
            validationNotExists: [{id: 1154, value: 'הר המנוחות'},{id: 1155, value: 'rrrr'},]
          },
          grid: {
            xs: 12,
            md: 6
          }
        // },
      // ],
      // grid: {
      //   xs: 12,
      //   md: 12
      // }
}
// קוד ביטוח לאומי | קוד בית עלמין | קואורדינטות
const segment2 = {
  container: [
      // קוד ביטוח לאומי
      {
        id: 'nationalInsuranceCode',
        label: 'קוד ביטוח לאומי',
        name: 'nationalInsuranceCode',
        defaultValue: '',
        properties: {
          type: 2,
          fullWidth: true,
          // validationRequired: true,
        },
        grid: {
          xs: 6,
          md: 4
        }
      },
      // קוד בית עלמין
      {
        id: 'cemeteryCode',
        label: 'קוד בית עלמין',
        name: 'cemeteryCode',
        defaultValue: '',
        properties: {
          type: 2,
          fullWidth: true,
          required: true
        },
        grid: {
          xs: 6,
          md: 4
        }
      },
      // קואורדינטות
      {
        id: 'coordinates',
        label: 'קואורדינטות',
        name: 'coordinates',
        defaultValue: '',
        properties: {
          type: 2,
          fullWidth: true,
          required: true
        },
        grid: {
          xs: 12,
          md: 4
        }
      },
  ],
  grid: {
    xs: 12,
    md: 12
  }
}
// כתובת בית העלמין
const segment3 = {
  container: [
    // כתובת בית העלמין
    {
      id: 'address',
      label: 'כתובת בית העלמין',
      name: 'address',
      defaultValue: '',
      properties: {
        type: 2,
        fullWidth: true,
        required: true
      },
      grid: {
        xs: 12,
        md: 12
      }
    },
  ],
  grid: {
    xs: 12,
    md: 12
  }
}
// שם אחראי בית עלמין וטלפון
const segment4 = {
  container : [
      // אחראי בית העלמין
      {
        id: 'contactName',
        label: 'אחראי בית העלמין',
        name: 'contactName',
        defaultValue: '',
        properties: {
          type: 2,
          fullWidth: true,
          required: true
        },
        grid: {
          xs: 12,
          md: 6
        }
      },
      // טלפון אחראי בית העלמין
      // {
      //   id: 'contactPhoneNumber',
      //   label: 'טלפון אחראי בית העלמין',
      //   name: 'contactPhoneNumber',
      //   defaultValue: '',
      //   properties: {
      //     type: 2,
      //     fullWidth: true,
      //     required: true
      //   },
      //   grid: {
      //     xs: 12,
      //     md: 6
      //   }
      // },
  ],
  grid: {
    xs: 12,
    md: 12
  }
}
// מסמכים
const segment5 = {
  container: [
    // מסמכים
    {
      id: 'documentsList',
      name: 'documentsList',
      defaultValue: '',
      properties: {
        type: 3,
        required: true,
      },
      grid: {
        xs: 12,
        md: 12
      }
    },],
  grid: {
    xs: 12,
    md: 12
  }
}
// isActive
const segment6 = {
  id: 'isActive',
  name: 'isActive',
  defaultValue: '',
  properties: {
    type: 2,
    fullWidth: true,
    required: true,
    hidden: true
  }
}
// יצירת רשומה
const segment7 = {
  id: 'createdDate',
  name: 'createdDate',
  defaultValue: '',
  properties: {
    type: 2,
    fullWidth: true,
    required: true,
    hidden: true
  }
}
// inactiveDate
const segment8 = {
  id: 'inactiveDate',
  name: 'inactiveDate',
  defaultValue: '',
  properties: {
    type: 2,
    fullWidth: true,
    required: true,
    hidden: true
  }
}

const content = [ 
  segment1,
]
const content2 = [ 
  segment,
   segment1, 
   segment2, segment3, segment4, segment5, segment6, segment7, segment8,  
]
// ------------------------------------------------------------------ footer ------------------------------------------------------------------

const footer = [ 
  {
      id: 'submit', 
      name: 'שלח',
      properties: {
        type: 'submit',
        // variant: "contained", 
        color: "primary",
        fullWidth: true,
        required: true
      },
      grid: {
        md:12,
        padding: 0,
      }
  }
]

// * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - 
// * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - 

    const { setUpdateCemetery, testSetDataCemetery , getAllDataCemeteries,
      addOrUpdateDataCemetery,} = useQueries()

    onSubmit = (form) => {
      console.log(form)
        let isUpdate = form?.id || null
        // if (isUpdate) {
        //   setUpdateCemetery(form)
        // } else {
          addOrUpdateDataCemetery(form)
        // }
      }


    criteria = {header, content, footer}



    return ( 
        <TemplateFormFloating 
            form={form} setForm={setForm} 
            criteria={criteria} setCriteria={setCriteria} 
            onSubmit={onSubmit} />
      )
}

export default CemeteryFormFloating

