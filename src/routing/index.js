import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate, useParams, useLocation } from 'react-router-dom'

import React, { useContext } from 'react'
import { GlobalContext } from '../App'

// lyouts
import LoginLayouts from '../layouts/pages/LoginLayouts'
import Graves from '../layouts/pages/Graves'
import Cemetery from '../layouts/entities/cemetery/Cemetery'
import Blocks from '../layouts/entities/block2/Blocks'
import Plots from '../layouts/entities/plot/Plots'
import NotFoundLayouts from '../layouts/pages/NotFoundLayouts'
import AreaGraves from '../layouts/entities/areaGrave/AreaGraves'
import Home from '../layouts/pages/Home'
import CemeteryRecords from '../layouts/entities/cemetery/CemeteryRecords/CemeteryRecords'
import CemeteryDetail from '../layouts/entities/cemetery/CemeteryRecords/CemeteryDetails/CemeteryDetail'

import CemeteryHome from '../layouts/entities/test/Graves/pages/cemetery/CemeteryHome'
import BlockHome from '../layouts/entities/test/Graves/pages/block/BlockHome'

import CemeteryTestDetail from '../layouts/entities/test/Graves/pages/cemetery/CemeteryDetail'
import BlockTestDetail from '../layouts/entities/test/Graves/pages/block/BlockDetail'
import CemeteryForm from '../layouts/entities/test/Graves/pages/cemetery/CemeteryForm'
import BlockForm from '../layouts/entities/test/Graves/pages/block/BlockForm'
import PlotTestDetail from '../layouts/entities/test/Graves/pages/plot/PlotDetail'
import PlotForm from '../layouts/entities/test/Graves/pages/plot/PlotForm'
import AreaGraveTestDetail from '../layouts/entities/test/Graves/pages/areaGrave/AreaGraveDetail'
import AreaGraveForm from '../layouts/entities/test/Graves/pages/areaGrave/AreaGraveForm'
import PlotHome from '../layouts/entities/test/Graves/pages/plot/PlotHome'
import AreaGraveHome from '../layouts/entities/test/Graves/pages/areaGrave/AreaGraveHome'

const RouterApp = () => {
  const { token } = useContext(GlobalContext)

  const router = createBrowserRouter(
    createRoutesFromElements(
      (token && token !== '') ?
        <Route path='/' element={<Graves />}>

          <Route path='Cemetery' element={<CemeteryHome />}>
            <Route path=':id' element={<CemeteryTestDetail />}>
              <Route path=':id' element={<BlockTestDetail />}>
                <Route path=':id' element={<PlotTestDetail />} >
                  <Route path=':id' element={<AreaGraveTestDetail />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path='Block' element={<BlockHome />} >
            <Route path=':id' element={<BlockTestDetail />} >
              <Route path=':id' element={<PlotTestDetail />} >
                <Route path=':id' element={<AreaGraveTestDetail />} />
              </Route>
            </Route>
          </Route>

          <Route path='Plot' element={<PlotHome />} >
            <Route path=':id' element={<PlotTestDetail />} >
              <Route path=':id' element={<AreaGraveTestDetail />} />
            </Route>
          </Route>

          <Route path='AreaGrave' element={<AreaGraveHome />} >
              <Route path=':id' element={<AreaGraveTestDetail />} />
          </Route>

          <Route path='createCemetery' element={<CemeteryForm />} />
          <Route path='createBlock' element={<BlockForm />} />
          <Route path='createPlot' element={<PlotForm />} />
          <Route path='createAreaGrave' element={<AreaGraveForm />} />






          <Route index element={<Navigate to='cemetery2' />} />

          <Route path='cemetery2' element={<Cemetery />} >
            <Route index element={<CemeteryRecords />} />
            {/* <Route path=':id' element={<CemeteryDetail />} /> */}
            <Route path=':id' element={<CemeteryDetail />} >
              {/* <Route path=':id' element={<CemeteryDetail />} /> */}
            </Route>
          </Route>

          <Route path='blocks2' element={<Blocks />} />

          <Route path='plot2' element={<Plots />} />

          <Route path='burialGround2' element={<AreaGraves />} />

          <Route path='customers' element={<div>customers</div>} />
          <Route path='purchases' element={<div>purchases</div>} />
          <Route path='burial' element={<div>burial</div>} />

          <Route path='reports' element={<div>reports</div>} />
          <Route path='reports-test' element={<div>reports-test</div>} />

          <Route path='home' element={<Home />} />

          <Route path='about' element={<div>about</div>} />
          <Route path='*' element={
            <NotFoundLayouts />
            // <Navigate to='/' />
          } />
        </Route>
        :
        <Route path='/' element={<LoginLayouts />}>
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
    )
  )

  return <RouterProvider router={router} />
}
export default RouterApp