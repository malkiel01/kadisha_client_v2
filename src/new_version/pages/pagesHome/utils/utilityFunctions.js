export const summarizeEntities = (entities = [], getEntitiesByAttr, summarizeGraves) => {

  return entities?.map(entity => {
    console.log(entity);
    // const nestedEntities = getEntitiesByAttr(entity);
    // let aggregatedSummaries = {
    //   plotClose: 0,
    //   plotUnusual: 0,
    //   plotExempt: 0,
    //   available: 0,
    //   purchased: 0,
    //   buried: 0
    // };

    // nestedEntities?.forEach(nestedEntity => {
    //   const summaries = summarizeGraves(nestedEntity);
    //   summaries?.forEach(summary => {
    //     aggregatedSummaries.plotClose += summary.plotClose;
    //     aggregatedSummaries.plotUnusual += summary.plotUnusual;
    //     aggregatedSummaries.plotExempt += summary.plotExempt;
    //     aggregatedSummaries.available += summary.available;
    //     aggregatedSummaries.purchased += summary.purchased;
    //     aggregatedSummaries.buried += summary.buried;
    //   });
    // });

    return {
      ...entity,
      // ...aggregatedSummaries
    };
  });
};

export const getMyRoot = (entities = [], id) => {
  const entity = entities?.find(e => e.id === id);
  return [{ title: 'בית העלמין', value: entity?.name }];
};

export const handleClickRow = (row, navigate, getEntitiesByAttr, getSummaryByBlock, myRoot) => {
  if (row) {
    const id = row[0]?.id;
    const item = getEntitiesByAttr(id);
    const summaries = getSummaryByBlock(item);

    navigate(`${id}`, {
      state: {
        value: row[0],
        data: item,
        summaries: summaries,
        root: myRoot(row[0]?.id)
      }
    });
  }
};
