import useCemeteryQueries from './queries/queriesEntities/useCemeteryQueries'
import useBlockQueries from './queries/queriesEntities/useBlockQueries'
import usePlotQueries from './queries/queriesEntities/usePlotQueries'
import useAreaGraveQueries from './queries/queriesEntities/useAreaGraveQueries'

const useQueries = () => {

  const { AllDataCemeteries, addOrUpdateDataCemetery, removeCemetery } = useCemeteryQueries()
  const { AllDataBlocks, addOrUpdateDataBlock, removeBlock, getBlocksByCemetery } = useBlockQueries()
  const { AllDataPlots, addOrUpdateDataPlot, removePlot, getPlotsByBlock } = usePlotQueries()
  const { AllDataAreaGraves, addOrUpdateDataAreaGrave, removeAreaGrave, getAreaGravesByPlot } = useAreaGraveQueries()


  return { 
    AllDataCemeteries,
    AllDataBlocks,
    AllDataPlots,
    AllDataAreaGraves,

    getBlocksByCemetery,
    getPlotsByBlock,
    getAreaGravesByPlot,

    addOrUpdateDataCemetery,
    addOrUpdateDataBlock,
    addOrUpdateDataPlot,
    addOrUpdateDataAreaGrave,

    removeCemetery, 
    removeBlock,
    removePlot,
    removeAreaGrave,
  }
}

export default useQueries;
