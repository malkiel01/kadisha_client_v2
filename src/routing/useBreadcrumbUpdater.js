import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useBreadcrumbUpdater = (breadcrumbName, shouldUpdate) => {
 
  const { pathname } = useLocation()
  const lastPathSegment = '/' + pathname.split('/').filter(x => x).pop()

  useEffect(() => {
    if (shouldUpdate) {
      let tempRouterName = JSON.parse(localStorage.getItem('routerName')) || {}
      
      if (tempRouterName[lastPathSegment] !== breadcrumbName) {
        const newTempRouterName = { ...tempRouterName, [lastPathSegment]: breadcrumbName };
        localStorage.setItem('routerName', JSON.stringify(newTempRouterName))
      }
    }
  }, [lastPathSegment, breadcrumbName, shouldUpdate ]);
};

export default useBreadcrumbUpdater;

