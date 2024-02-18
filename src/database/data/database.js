import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../App'
import { useDispatch } from 'react-redux'

import { dataCemeteriesActions } from '../store/cemeteries'
import { AddCemetery, getCemeteries, setRemoveCemetery, UpdateCemetery } from './queriesTest/cemeteriesQueries'

const useDatabase = () => {
  const { token, setToken, setDataCemeteries } = useContext(GlobalContext)
  const dispatch = useDispatch()

  // Cemetery -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * --

  

  
  return { 

  }
}

export default useDatabase;

