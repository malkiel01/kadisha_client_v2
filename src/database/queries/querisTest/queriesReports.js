const useQueriesReports = () => {

  // מחזירה את הערך שהאטריביוט שלו זהה לווליו
  // מחזירה ערך אחד בלבד - ראשון
  // const getEntityByAttr = (entities = [], attr, value) => {
  //   let res = entities.find(entity => entity[attr] === value)
  //   return res
  // }

  const getEntityByAttr = (data = [], nameAttr = '', attr) => {
    return data?.find(entity => entity[nameAttr] === attr);
  }
  // const getEntityByAttr = (attr, data = [], nameAttr = '') => {
  //   return data.find(entity => entity[nameAttr] === attr);
  // }

  // מחזירה את הערכים שהאטריביוט שלהם זהה לווליו
  // מחזירה מערך של כל הערכים
  const getEntitiesByAttr = (entities, attr, value) => {
    if (!entities) {
        return []
    }
    return entities?.filter(entity => entity[attr] === value)
};

  // מחזירה את הערך שהאטריביוט שלו גדול מהווליו
  // מחזירה ערך אחד בלבד - ראשון
  const getEntityByAttrGreaterThan = (entities, attr, value) => {
    let res = entities?.find(entity => entity[attr] > value)
    return res || {}
  }

  // מחזירה את הערכים שהאטריביוט שלהם זהה לווליו
  // מחזירה מערך של כל הערכים
  const getEntitiesByAttrGreaterThan = (entities, attr, value) => {
    let res = entities.filter(entity => entity[attr] > value)
    return res || []
  }
  // מחזירה את הערך שהאטריביוט שלו קטן מהווליו
  // מחזירה ערך אחד בלבד - ראשון
  const getEntityByAttrLessThan = (entities, attr, value) => {
    let res = entities.find(entity => entity[attr] < value);
    return res || {};
  }
  // מחזירה את הערכים שהאטריביוט שלהם קטן מהווליו
  // מחזירה מערך של כל הערכים
  const getEntitiesByAttrLessThan = (entities, attr, value) => {
    let res = entities.filter(entity => entity[attr] < value);
    return res || [];
  }

  return {
    getEntityByAttr,
    getEntitiesByAttr,
    getEntityByAttrGreaterThan,
    getEntitiesByAttrGreaterThan,
    getEntityByAttrLessThan,
    getEntitiesByAttrLessThan

  }
}

export default useQueriesReports
