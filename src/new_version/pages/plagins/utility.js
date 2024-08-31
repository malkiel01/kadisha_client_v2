// utility.js
export const onClickRow = (row, getSummary = () => {}, navigate ) => {
  if (row) {
    let id = row[0]?.id;
    let summaries = getSummary(row[0])

    navigate(`${id}`, {
      state: {
        value: row[0],
        summaries: summaries,
      }
    });
  }
}

export const mapFieldValues = (data, optionsFields) => {
  return data?.map(item => {
    let newItem = { ...item };
    optionsFields?.forEach(fieldOption => {
      if (newItem[fieldOption?.field] !== undefined) {
        const match = fieldOption?.values?.find(opt => opt?.value === newItem[fieldOption?.field]);
        newItem[fieldOption?.field] = match ? match.name : newItem[fieldOption?.field];
      }
    });
    return newItem;
  });
}


