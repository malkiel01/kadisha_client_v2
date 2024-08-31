import useCemeteryQueries from './queries/queriesEntities/useCemeteryQueries'
import useBlockQueries from './queries/queriesEntities/useBlockQueries'
import usePlotQueries from './queries/queriesEntities/usePlotQueries'
import useAreaGraveQueries from './queries/queriesEntities/useAreaGraveQueries'
import useCustomerQueries from './queries/queriesEntities/useCustomerQueries'
import usePurchaseQueries from './queries/queriesEntities/usePurchaseQueries'
import useBurialQueries from './queries/queriesEntities/useBurialQueries'
import useGraveQueries from './queries/queriesEntities/useGraveQueries'
import useGlobalQueries from './queries/queriesGlobal'
import useRowsQueries from './queries/queriesEntities/useRowQueries'
import usePaymentQueries from './queries/queriesEntities/usePaymentQueries'
import useQueriesReports from './queries/querisTest/queriesReports'
import useCityQueries from './queries/queriesEntities/useCityQueries'
import useCountryQueries from './queries/queriesEntities/useCountryQueries'
import useSignatureQueries from './queries/queriesEntities/useSignatureQueries'

const useQueries = () => {

  const { AllDataCemeteries, addOrUpdateDataCemetery, removeCemetery } = useCemeteryQueries()
  const { AllDataBlocks, addOrUpdateDataBlock, removeBlock } = useBlockQueries()
  const { AllDataPlots, addOrUpdateDataPlot, removePlot } = usePlotQueries()
  const { 
    AllDataAreaGraves, addOrUpdateDataAreaGrave, removeAreaGrave } = useAreaGraveQueries()
  const { AllDataGraves, addOrUpdateDataGrave, removeGrave} = useGraveQueries()

  const { addOrUpdateDataRow, getRows, AllDataRows } = useRowsQueries()
  const { getNameEntities } = useGlobalQueries()
  
  const { AllDataCustomers, addOrUpdateDataCustomer } = useCustomerQueries()
  const { AllDataPayments, addOrUpdateDataPayment } = usePaymentQueries()
  const { AllDataBurials, addOrUpdateDataBurial, removeBurial } = useBurialQueries()
  const { AllDataPurchases, AllDataPurchasesOld, addOrUpdateDataPurchase, duplicateAndUpdatePurchase, removePurchase } = usePurchaseQueries()

  const { AllDataSignatures, addOrUpdateDataSignature } = useSignatureQueries()

  const { AllDataCities, addOrUpdateDataCity } = useCityQueries()
  const { AllDataCountries, addOrUpdateDataCountry } = useCountryQueries()
  
  const { getEntityByAttr, getEntitiesByAttr, getEntityByAttrGreaterThan, getEntitiesByAttrGreaterThan, getEntityByAttrLessThan, getEntitiesByAttrLessThan } = useQueriesReports()
  
  const dataRefresh = async () => {
    try {
      await AllDataCemeteries()
      await AllDataBlocks()
      await AllDataPlots()
      await AllDataRows()
      await AllDataAreaGraves()
      await AllDataGraves()
      await AllDataPurchases()
      await AllDataBurials()
      await AllDataPayments()
      await AllDataCountries()
      await AllDataCities()
    } catch (error) {
      console.error('Error during data refresh:', error)
    }
  }

  return { 
    AllDataCemeteries,
    AllDataBlocks,
    AllDataPlots,
    AllDataAreaGraves,
    AllDataGraves, 
    AllDataRows,
    AllDataCustomers,
    AllDataPurchases,
    AllDataPurchasesOld,
    AllDataBurials,
    AllDataPayments,
    AllDataCities,
    AllDataCountries,
    AllDataSignatures, 
    
    addOrUpdateDataCemetery,
    addOrUpdateDataBlock,
    addOrUpdateDataPlot,
    addOrUpdateDataRow,
    addOrUpdateDataAreaGrave,
    addOrUpdateDataGrave, 
    addOrUpdateDataPayment,
    addOrUpdateDataSignature,

    addOrUpdateDataCustomer,
    addOrUpdateDataPurchase,
    duplicateAndUpdatePurchase,
    addOrUpdateDataBurial,

    addOrUpdateDataCity,
    addOrUpdateDataCountry,
    
    getRows,
    
    removeCemetery, 
    removeBlock,
    removePlot,
    removeAreaGrave,
    removeGrave,
    removePurchase,
    removeBurial,

    getNameEntities,

    // ------ reports
    getEntityByAttr,
    getEntitiesByAttr,
    getEntityByAttrGreaterThan,
    getEntitiesByAttrGreaterThan,
    getEntityByAttrLessThan,
    getEntitiesByAttrLessThan,

    dataRefresh
  }
}

export default useQueries