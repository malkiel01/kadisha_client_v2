import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate, Outlet } from 'react-router-dom'

import React, { useContext } from 'react'
import { GlobalContext } from '../../App'

// lyouts
import Graves           from '../pages/pagesMains/GravesManagers/Graves'

import Home             from '../pages/pagesMains/Home'

import Connection       from '../pages/pagesMains/connection/connection'

import CemeteryDetail   from '../pages/pagesDetails/CemeteryDetail'
import BlockDetail      from '../pages/pagesDetails/BlockDetail'
import PlotDetail       from '../pages/pagesDetails/PlotDetail'
import AreaGraveDetail  from '../pages/pagesDetails/AreaGraveDetail'

import CemeteryHome     from '../pages/pagesHome/CemeteryHome'
import BlockHome        from '../pages/pagesHome/BlockHome'
import PlotHome         from '../pages/pagesHome/PlotHome'
import AreaGraveHome    from '../pages/pagesHome/AreaGraveHome'
import CustomersHome    from '../pages/pagesHome/CustomersHome'
import PurchasesHome    from '../pages/pagesHome/PurchasesHome'
import BurialsHome      from '../pages/pagesHome/BurialsHome'
import PaymentsHome     from '../pages/pagesHome/PaymentsHome'

import CemeteryCreate   from '../pages/pagesCreate/cemeteryCreate'
import BlockCreate      from '../pages/pagesCreate/blockCreate'
import PlotCreate       from '../pages/pagesCreate/plotCreate'
import GraveCreate      from '../pages/pagesCreate/graveCreate'
import PurchaseCreate   from '../pages/pagesCreate/purchaseCreate'
import BurialCreate     from '../pages/pagesCreate/burialCreate'
import CustomerCreate   from '../pages/pagesCreate/customerCreate'
import PaymentCreate    from '../pages/pagesCreate/paymentCreate'
import CountryCreate    from '../pages/pagesCreate/countryCreate'
import CityCreate       from '../pages/pagesCreate/cityCreate'

import CemeteryUpdate   from '../pages/pagesUpdate/cemeteryUpdate'
import BlockUpdate      from '../pages/pagesUpdate/blockUpdate'
import PlotUpdate       from '../pages/pagesUpdate/plotUpdate'
import GraveUpdate      from '../pages/pagesUpdate/graveUpdate'
import BurialUpdate     from '../pages/pagesUpdate/burialUpdate'
import PurchaseUpdate   from '../pages/pagesUpdate/purchaseUpdate'
import CustomerUpdate   from '../pages/pagesUpdate/customerUpdate'
import PaymentUpdate    from '../pages/pagesUpdate/paymentUpdate'
import IndexComponent from '../pages/pagesHome/reports/indexReports'
import TestReports from '../pages/pagesHome/reports/testReports'
import SignInSide from '../pages/pagesMains/connection/SignInSide'
import SearchBar  from '../pages/pagesTesting/SearchBar'
import CustomGrid from '../pages/pagesTesting/CustomGrid'
import CustomTooltip from '../pages/pagesTesting/CustomTooltip'
import DraggableList from '../pages/pagesTesting/handleToggleExpand'
import RegistrationForm from '../pages/pagesMains/connection/RegistrationForm'

const RouterApp = () => {
  const { token } = useContext(GlobalContext)

  const router = createBrowserRouter(
    createRoutesFromElements(
      (token && token !== undefined && token !== null && token !== '') ?

        <Route path='/' element={<Graves key={0} />}>
          <Route index element={<Navigate to='cemetery' />} />

          <Route path='cemetery' element={<Outlet />} >
            <Route index element={<CemeteryHome />} />
            <Route path=':id' element={<Outlet />}>
              <Route index element={<CemeteryDetail />} />
              <Route path=':id' element={<Outlet />}>
                <Route index element={<BlockDetail />} />
                <Route path=':id' element={<Outlet />} >
                  <Route index element={<PlotDetail />} />
                  <Route path=':id' element={<Outlet />} >
                    <Route index element={<AreaGraveDetail />} />
                  </Route>
                  <Route path='areaGraveCreate' element={<GraveCreate />} />
                </Route>
                <Route path='plotCreate' element={<PlotCreate />} />
              </Route>
              <Route path='blockCreate' element={<BlockCreate />} />
            </Route>
            <Route path='cemeteryCreate' element={<CemeteryCreate />} />
          </Route>

          <Route path='block' element={<Outlet />}>
            <Route index element={<BlockHome />} />
            <Route path=':id' element={<Outlet />}>
              <Route index element={<BlockDetail />} />
              <Route path=':id' element={<Outlet />} >
                <Route index element={<PlotDetail />} />
                <Route path=':id' element={<Outlet />} >
                  <Route index element={<AreaGraveDetail />} />
                </Route>
                <Route path='areaGraveCreate' element={<GraveCreate />} />
              </Route>
              <Route path='plotCreate' element={<PlotCreate />} />
            </Route>
            <Route path='blockCreate' element={<BlockCreate />} />
          </Route>

          <Route path='plot' element={<Outlet />}>
            <Route index element={<PlotHome />} />
            <Route path=':id' element={<Outlet />} >
              <Route index element={<PlotDetail />} />
              <Route path=':id' element={<Outlet />} >
                <Route index element={<AreaGraveDetail />} />
              </Route>
              <Route path='areaGraveCreate' element={<GraveCreate />} />
            </Route>
            <Route path='plotCreate' element={<PlotCreate />} />
          </Route>

          <Route path='areaGrave' element={<Outlet />} >
            <Route index element={<AreaGraveHome />} />
            <Route path=':id' element={<Outlet />} >
              <Route index element={<AreaGraveDetail />} />
            </Route>
            <Route path='areaGraveCreate' element={<GraveCreate />} />
          </Route>

          {/* --------- */}

          <Route path='customer' element={<Outlet />} >
            <Route index element={<CustomersHome />} />
            <Route path=':id' element={<Outlet />}>
              <Route index element={<CustomerUpdate />} />
            </Route>
            <Route path='customerCreate' element={<CustomerCreate />} />
          </Route>

          <Route path='purchase' element={<Outlet />} >
            <Route index element={<PurchasesHome />} />
            <Route path=':id' element={<Outlet />}>
              <Route index element={<PurchaseUpdate />} />
            </Route>
            <Route path='purchaseCreate' element={<PurchaseCreate />} />
          </Route>

          <Route path='burial' element={<Outlet />} >
            <Route index element={<BurialsHome />} />
            <Route path=':id' element={<Outlet />}>
              <Route index element={<BurialUpdate />} />
            </Route>
            <Route path='burialUpdate' element={<BurialUpdate />} />
          </Route>

          <Route path='payment' element={<Outlet />} >
            <Route index element={<PaymentsHome />} />
            <Route path=':id' element={<Outlet />}>
              <Route index element={<PaymentUpdate />} />
            </Route>
            <Route path='paymentCreate' element={<PaymentCreate />} />
          </Route>


          <Route path='reports' element={<IndexComponent />} />
          <Route path='sales-report' element={<TestReports />} />
          

          


          <Route path='SearchBar' element={<SearchBar />} />
          <Route path='CustomGrid' element={<CustomGrid />} />
          <Route path='CustomTooltip' element={<CustomTooltip />} />
          <Route path='DraggableList' element={<DraggableList />} />
          
          




          <Route path='cemeteryUpdate' element={<CemeteryUpdate />} />
          <Route path='blockUpdate' element={<BlockUpdate />} />
          <Route path='plotUpdate' element={<PlotUpdate />} />
          <Route path='areaGraveUpdate' element={<GraveUpdate />} />

          {/* <Route path='customerCreate' element={<CustomerUpdate />} /> */}

          <Route path='purchaseCreate' element={<PurchaseCreate />} />
          <Route path='purchaseUpdate' element={<PurchaseUpdate />} />
          <Route path='burialCreate' element={<BurialCreate />} />
          <Route path='burialUpdate' element={<BurialUpdate />} />

          <Route path='countryCreate' element={<CountryCreate />} />
          <Route path='cityCreate' element={<CityCreate />} />

          {/* <Route path='floorCreateCreate' element={<FloorGraveCreate />} /> */}

          {/* <Route path='test' element={<RowCreate />} /> */}

          {/* <Route path='home' element={<Home />} /> */}
          {/* <Route path='grave' element={<AreaGraveDetail />} /> */}

          
          {/* <Route path='about' element={<div>about</div>} /> */}
          {/* <Route path='row' element={<RowsShow />} /> */}

          {/* <Route path='cemeteryCreate' element={<CemeteryCreate />} /> */}
          {/* <Route path='blockCreate' element={<BlockCreate />} /> */}
          {/* <Route path='plotCreate' element={<PlotCreate />} /> */}
          {/* <Route path='graveCreate' element={<GraveCreate />} /> */}
          {/* <Route path='paymentCreate' element={<PaymentCreate />} /> */}

          <Route path='1234asd' element={<RegistrationForm />} />


          {/* <Route path='*' element={
         <NotFoundLayouts />
       } /> */}
        </Route>
        :
        <Route path='/' element={<SignInSide />}>
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
        // <Route path='/' element={<Connection />}>
        //   <Route path='*' element={<Navigate to='/' />} />
        // </Route>
    )
  )

  return <RouterProvider router={router} />
}
export default RouterApp