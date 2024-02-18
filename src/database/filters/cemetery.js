import { useContext } from 'react'
import { GlobalContext } from '../App'
import { useDispatch } from 'react-redux'

import { dataCemeteriesActions } from '../store/cemeteries'
import { AddItem, GetAllItems, RemoveItem } from './queriesTest/CRUD_Queries'
import { dataBlocksActions } from '../store/blocks'

const URL = `http://localhost:3001/`
const URL_SET_CEMETERY = `api/addCemetery`;
const URL_GET_CEMETERY = `api/getCemeteries`;
const URL_UPDATE_CEMETERY = `api/updateCemetery`;
const URL_REMOVE_CEMETERY = `api/removeCemetery`;

const URL_SET_BLOCK = `api/blocks/addBlock`;
const URL_GET_BLOCK = `api/blocks/getBlocks`;
const URL_UPDATE_BLOCK = `api/blocks/updateBlock`;
const URL_REMOVE_BLOCK = `api/blocks/removeBlock`;

const QUERY_ADD_CEMETERIES = `http://localhost:3001/api/add-cemeteries` 


const useFiltersCemetery = () => {
  const { token, setDataCemeteries, setDataBlocks, setLoading } = useContext(GlobalContext)
  const dispatch = useDispatch()

  // Cemetery -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --

  return { 
    // AllDataCemeteries,
    // addOrUpdateDataCemetery,
    // removeCemetery, 
    // AllDataBlocks,
    // addOrUpdateDataBlock,
    // removeBlock, 
  }
}

export default useFiltersCemetery;
