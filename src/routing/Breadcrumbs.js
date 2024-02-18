import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)
  const [name, setName] = useState('')

  useEffect(() => {
    pathnames.forEach(element => {
      setName(JSON.parse(localStorage.getItem('routerName'))?.['/' + element])
    })
  }, [location.pathname, name]); // הפעלה מחדש כאשר הנתיב משתנה


  return (
    <div>
      <Link to="/">דף הבית</Link>
      {pathnames.map((value, index) => {
        const to = '/' + value

        return (
          <span key={to}>
            {' > '}
            {
              index === pathnames.length -1 ? (
                <Link >{JSON.parse(localStorage.getItem('routerName'))?.['/' + value] || value}</Link>
              ) : (
                <Link to={to}>{JSON.parse(localStorage.getItem('routerName'))?.['/' + value] || value}</Link>
              )
            }
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs
