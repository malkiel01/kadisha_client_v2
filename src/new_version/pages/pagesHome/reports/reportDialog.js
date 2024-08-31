import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useQueries from '../../../../database/useQueries';
import { useIndexedDBSyncV2 } from '../../../../database/dataLocal/indexedDBHooks';
import FormTemplate from '../../../template/form/FormTemplate';
import CommponentOptions from '../../plagins/data/commponentOptions';
import { format, parseISO } from 'date-fns';

function ReportDialog({ setCategory = () => { } }) {
  // קבלת ערכים מהסטור
  const columns = useSelector((state) => state.columnsFormReports.data);

  // טעינת היוזים לפונקציות עזר
  const { AllDataRows, addOrUpdateDataRow, getEntityByAttr, getEntitiesByAttr } = useQueries();

  // קבלת נתוני דאטה בייס
  const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
  const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
  const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
  const { data: localRows, loading: loadingRows } = useIndexedDBSyncV2('myStore', 'dataRows');
  const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
  const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');
  // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
  const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingRows || loadingAreaGraves || loadingGraves
  // ערכי הראוטר
  const location = useLocation()
  const { value } = location.state || {};

  // דרישה לפניה לשרת
  // כרגע לא פעיל
  // const dataKeysAsync = ['dataPayments'];
  // const loadingAsync = useDataLoader(dataKeysAsync);

  // איזור המשתנים והסטייטים
  // משתנים לטופס
  const [fieldsWithDynamicDisabled, setFieldsWithDynamicDisabled] = useState([]); // השדות
  const [formValues, setFormValues] = useState({}); // ערכי השדות
  const [errors, setErrors] = useState({}); // שגיאת השדות
  // עוקב אחר שליחת נתונים לשרת דרך פונקציית סבמיט
  const [loadingData, setloadingData] = useState(false);

  // משתנים לערכי סלקט של השדות
  const [cemeteries, setCemeteries] = useState([])
  const [blocks, setBlocks] = useState([])
  const [plots, setPlots] = useState([])

  // פונקציה לטעינת השדות מתוך הסטור
  const myColumns = (localColumns = null) => {
    localColumns = localColumns !== null ? localColumns : columns
    return localColumns.map((field, index) => {
      // let lock = false
      // lock = (
      //   field.name === 'cemeteryId' || field.name === 'blockId' || field.name === 'plotId'
      // ) ? true : false
      return ({
        ...field,
        // disabled: lock ? lock : field.disabled,
        required: (field.name === 'spouse' && formValues.maritalStatus === 2) ? true : (field.required || false),
        show: field?.show || false,
      })
    });
  };

  // // פעולות המתבצעות רק לאחר קבלת דאטה בייס ווליו מהראוטר
  useEffect(() => { !loading && handleAllDataLoaded() }, [loading]);

  // טעינת הנתונים לאחר קבלת הערכים מהדאטה בייס הלוקלי
  const handleAllDataLoaded = () => {
    const initialFormValues = myColumns().reduce((acc, field) => {
      let fieldValue = '';
      if (field.name === 'cemeteryId' || field.name === 'blockId' || field.name === 'plotId') {
        fieldValue = -1
      }
      if (field.input === 'date') {
        if (field.name === 'startDate') {
          const currentYear = new Date().getFullYear();
          fieldValue = format(new Date(currentYear, 0, 1), 'yyyy-MM-dd'); // תחילת השנה הנוכחית
        } else if (field.name === 'endDate') {
          fieldValue = format(new Date(), 'yyyy-MM-dd'); // התאריך הנוכחי
        }
      }


      return {
        ...acc,
        [field.name]: fieldValue,
      };
    }, {});

    setFieldsWithDynamicDisabled(myColumns());
    setFormValues(initialFormValues);
    fieldAuto();
  };


  // // טעינת ערכים אוטומטית לשדות
  const fieldAuto = () => {
    setCemeteries(
      [
        CommponentOptions({ value: '', label: '' }),
        ...localCemeteries.map(cemetery => CommponentOptions({ value: cemetery?.id, label: cemetery?.cemeteryNameHe }))
      ]
    )
    setBlocks(
      [
        CommponentOptions({ value: '', label: '' }),
        ...localBlocks.map(block => {
          const cemetery = localCemeteries.find(cemetery => cemetery?.id === block?.cemeteryId)
          return CommponentOptions({
            value: block?.id, label: block?.blockNameHe, dataUnderRigth: {
              title: 'בית עלמין: ',
              value: cemetery?.cemeteryNameHe
            }
          })
        })
      ]
    )
    setPlots(
      [
        CommponentOptions({ value: '', label: '' }),
        ...localPlots.map(plot => {
          const block = localBlocks.find(block => block?.id === plot?.blockId)
          const cemetery = localCemeteries?.find(cemetery => cemetery?.id === block?.cemeteryId)
          return CommponentOptions({
            value: plot?.id, label: plot?.plotNameHe,
            dataUnderRigth: { title: 'גושים: ', value: block?.blockNameHe },
            dataUnderLeft: { title: 'בית עלמין: ', value: cemetery?.cemeteryNameHe },
          })
        })
      ]
    )
  }

  const fieldChangeCemeteryId = (event, newFormValues) => {
    let blocks = localBlocks
    let plots = localPlots
    let res = {}
    if (event.target.value !== -1 && event.target.value !== '') {
      delete newFormValues?.blockId;
      delete newFormValues?.plotId;
      delete newFormValues?.lineId;
      blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', event.target.value)
      plots = localPlots.filter(plot =>
        blocks.some(block => block.id === plot.blockId)
      )
      res = { plotId: -1, blockId: -1, cemeteryId: event.target.value }
    }
    else {
      res = { plotId: -1, blockId: -1, cemeteryId: -1 }
    }
    setBlocks(
      [
        CommponentOptions({ value: '', label: '' }),
        ...blocks.map(block => {
          const cemetery = localCemeteries.find(cemetery => cemetery?.id === block?.cemeteryId)
          return CommponentOptions({
            value: block?.id, label: block?.blockNameHe, dataUnderRigth: {
              title: 'בית עלמין: ',
              value: cemetery?.cemeteryNameHe
            }
          })
        })
      ]
    )
    setPlots(
      [
        CommponentOptions({ value: '', label: '' }),
        ...plots.map(plot => {
          const block = localBlocks.find(block => block?.id === plot?.blockId)
          const cemetery = localCemeteries?.find(cemetery => cemetery?.id === block?.cemeteryId)
          return CommponentOptions({
            value: plot?.id, label: plot?.plotNameHe,
            dataUnderRigth: { title: 'גוש: ', value: block?.blockNameHe },
            dataUnderLeft: { title: 'בית עלמין: ', value: cemetery?.cemeteryNameHe },
          })
        })
      ]
    )
    return res
  }
  const fieldChangeBlockId = (event, newFormValues) => {
    let res = {}
    if (event.target.value !== -1 && event.target.value !== '') {
      delete newFormValues?.plotId;
      delete newFormValues?.lineId;

      const block = getEntityByAttr(localBlocks, 'id', event.target.value)
      const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

      const plots = getEntitiesByAttr(localPlots, 'blockId', event.target.value)

      setPlots(
        [
          CommponentOptions({ value: '', label: '' }),
          ...plots.map(plot => {
            const block = localBlocks.find(block => block?.id === plot?.blockId)
            const cemetery = localCemeteries?.find(cemetery => cemetery?.id === block?.cemeteryId)
            return CommponentOptions({
              value: plot?.id, label: plot?.plotNameHe,
              dataUnderRigth: { title: 'גוש: ', value: block?.blockNameHe },
              dataUnderLeft: { title: 'בית עלמין: ', value: cemetery?.cemeteryNameHe },
            })
          })
        ]
      )
      res = { cemeteryId: cemetery?.id, blockId: event.target.value, plotId: -1 }
    }
    else {
      res = { ...res, plotId: -1, blockId: -1 }
    }
    return res
  }
  const fieldChangePlotId = (event, newFormValues) => {
    let res = {}
    if (event.target.value !== -1 && event.target.value !== '') {
      delete newFormValues?.lineId;

      const plot = getEntityByAttr(localPlots, 'id', event.target.value)
      const block = getEntityByAttr(localBlocks, 'id', plot?.blockId)
      const cemetery = getEntityByAttr(localCemeteries, 'id', block?.cemeteryId)

      res = { plotId: plot?.id, blockId: block?.id, cemeteryId: cemetery?.id }
    }
    return res
  }
  const handleChange = (event) => {

    let newFormValues = formValues
    let value = event.target.value
    if (event.target.name === 'cemeteryId') {
      const res = fieldChangeCemeteryId(event, newFormValues)
      newFormValues = { ...newFormValues, ...res }
    }
    if (event?.target?.name === 'blockId') {
      const res = fieldChangeBlockId(event, newFormValues)
      newFormValues = { ...newFormValues, ...res }
    }
    if (event?.target?.name === 'plotId') {
      const res = fieldChangePlotId(event, newFormValues)
      newFormValues = { ...newFormValues, ...res }
    }
    if (event?.target?.name === 'startDate' || event?.target?.name === 'endDate') {
      try {
        const parsedDate = parseISO(event.target.value);
        if (!isNaN(parsedDate.getTime())) {
          newFormValues = { ...newFormValues, [event.target.name]: format(parsedDate, 'yyyy-MM-dd') };
        // } else {
        //   console.error('Invalid date:', event.target.value);
        }
      } catch (error) {
        // console.error('Error parsing date:', error);
      }
    } else {
      newFormValues = { ...newFormValues, [event.target.name]: value };
    }

    setFormValues(newFormValues)

    if (validateForm(newFormValues)) {
      // console.log(newFormValues);


      const cemetery = newFormValues?.cemeteryId !== -1 ?
        getEntityByAttr(localCemeteries, 'id', newFormValues?.cemeteryId) : null
      const block = newFormValues?.blockId !== -1 ?
        getEntityByAttr(localBlocks, 'id', newFormValues?.blockId) : null
      const plot = newFormValues?.plotId !== -1 ?
        getEntityByAttr(localPlots, 'id', newFormValues?.plotId) : null
      const startDate = newFormValues?.startDate !== '' ? newFormValues?.startDate : new Date()
      const endDate = newFormValues?.endDate !== '' ? newFormValues?.endDate : new Date()

      const cemeteries = cemetery ? [cemetery] : localCemeteries
      const blocks = block ? [block] : localBlocks
        .filter(localBlock => cemeteries.some(block => block.id === localBlock.cemeteryId));
      const plots = plot ? [plot] : localPlots
        .filter(localPlot => blocks.some(plot => plot.id === localPlot.blockId));
      const areaGraves = localAreaGraves
        .filter(localAreaGrave => plots.some(areaGrave => areaGrave.id === localAreaGrave.plotId));
      const graves = localGraves
        .filter(localGrave => areaGraves.some(grave => grave.gravesList === localGrave.areaGraveId));

      setCategory({
        areaGraves, graves, startDate, endDate
      })

    }
  }

  const validateForm = (newFormValues) => {
    let tempErrors = {};
    let formIsValid = true;

    columns.forEach(field => {
      if (field.required && !newFormValues[field.name]) {
        tempErrors[field.name] = 'שדה חובה';
        formIsValid = false;
      }
    });

    setErrors(tempErrors);
    return formIsValid;
  };

  return (
    <>
      <FormTemplate
        // titleMin={`קריטריונים לדו״ח`}
        local={true}
        noCard

        fields={fieldsWithDynamicDisabled}
        columns={columns}
        formValues={{ ...formValues }}

        handleChange={handleChange}
        options={{
          cemeteryId: cemeteries,
          blockId: blocks,
          plotId: plots,
        }}
        errors={errors}
        noClearable
      />
    </>
  )
}

export default ReportDialog;
