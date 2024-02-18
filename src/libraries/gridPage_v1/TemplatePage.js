import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';

const rows3 = [
  {
    id: 0,
    container: true,
    spacing: 0,
    xs: 8,
    grids: [
      { id: 0, container: false, spacing: 2, xs: 12, md: 6, data: <h1>test componnent 4-3-1</h1> },
      { id: 1, container: false, spacing: 2, xs: 12, md: 4, data: <h1>test componnent 4-3-2</h1> },
    ],
  },
];

const rows2 = [
  {
    id: 0,
    container: true,
    spacing: 0,
    xs: 8,
    grids: [
      { id: 0, container: false, spacing: 2, xs: 12, md: 6, data: <h1>test componnent 4-1</h1> },
      { id: 1, container: false, spacing: 2, xs: 12, md: 4, data: <h1>test componnent 4-2</h1> },
      {
        id: 2,
        spacing: 0,
        xs: 12,
        data: [],
        grids: rows3,
      },
    ],
  },
];

const rows = [
  {id: 0, spacing: 0, xs: 2, grids: [
      { id: 0, spacing: 2, xs: 3, md: 3, data: <h1>test componnent 1-1</h1> },
      { id: 1, spacing: 2, xs: 3, md: 4, data: <h1>test componnent 1-2</h1> },
      { id: 2, spacing: 2, xs: 3, md: 2, data: <h1>test componnent 1-3</h1> },
    ],},
  {
    id: 1,
    spacing: 0,
    xs: 12,
    grids: [
      { id: 0, spacing: 2, xs: 12, md: 6, data: <h1>test componnent 2-1</h1> },
      { id: 1, spacing: 2, xs: 12, md: 4, data: <h1>test componnent 2-2</h1> },
      { id: 2, spacing: 2, xs: 12, md: 2, data: <h1>test componnent 2-3</h1> },
    ],
  },
  {
    id: 2,
    spacing: 0,
    xs: 12,
    data: <h1>test componnent 3-1</h1>,
  },
  {
    id: 3,
    spacing: 0,
    xs: 12,
    data: [],
    grids: rows2,
  },
];

const renderGrid = (gridData) => {
  if (Array.isArray(gridData)) {
    return gridData.map((item, index) => {
        if (item.grids) {
            return <Grid key={item.id}
                container
                xs={item.xs || 12} md={item.md || 12}
                className={item.className || null}
                >
                    {renderGrid(item.grids)}
                </Grid>
        } else {
            return <Grid key={item.id} 
                item 
                xs={item.xs || 12} md={item.md || 12} 
                className={item.className || null}
                >
                    {item.data}
                </Grid>
        }
    }
    )
  } 
}

const TemplatePage = ({id = 0, data = [], foolHeight = false}) => {

  

  const randomNumId = Math.floor(Math.random() * 101)

  const [adjustedHeight, setAdjustedHeight] = useState(0);
  const calculateAdjustedHeight = () => {
      const windowHeight = window.innerHeight;
      const element = document.getElementById('TemplatePage' + randomNumId)
      if (element) {
        const elementTop = element.getBoundingClientRect().top
        const newAdjustedHeight = windowHeight - elementTop
        setAdjustedHeight(newAdjustedHeight >= 0 ? newAdjustedHeight : 0)
      }
    }
  useEffect(() => {
        // קבע את הגובה מתאם כאשר הרכיב נטען
        calculateAdjustedHeight();

        // הוסף את האירוע לחישוב הגובה מתאם כאשר החלון משתנה
        window.addEventListener('resize', calculateAdjustedHeight);

        // ניקוי אירוע כאשר הרכיב יוסר
        return () => {
            window.removeEventListener('resize', calculateAdjustedHeight);
        };
  }, [window]);

  
  return  <Grid container 
              id ={'TemplatePage' + randomNumId}
              style={{
                position: 'relative',
                minHeight: foolHeight ? adjustedHeight : 0,
                 border: '1px solid yellow'}}>
             {renderGrid(data)}
          </Grid>
}

export default TemplatePage;

