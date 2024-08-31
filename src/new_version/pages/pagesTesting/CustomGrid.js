import React from 'react';
import { Grid, Box, ButtonGroup, Button, useTheme, Chip, Stack } from '@mui/material';
import SearchEntity from '../../template/components/SearchEntity';
import BtnGeneral from '../../template/tabs/btnGeneral';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import CustomizedBreadcrumbs from '../../template/components/breadcrumbs';
import ChipList from '../../template/components/ChipList';

function CustomGrid({
  search = false,
  filter = true,
  breadcrumbs = false,
  group = false,
  btnCreate = false,
  refresh = false,

}) {

  const initialChips = [
    // { id: 0, name: 'סוג רכישה: בחיים' },
    // { id: 1, name: 'תושבות: חו״ל' },
    // { id: 2, name: 'מחיר: מעל 500 ש״ח' },
  ];

  const handleChipsChange = (updatedChips) => {
    console.log('Updated Chips:', updatedChips);
  };

  const theme = useTheme();
  return (
    <Grid container spacing={1} sx={{ backgroundColor: 'transparent', marginTop: 8 }}>
      {/* קומה ראשונה */}
      {
        breadcrumbs &&
        <Grid container item xs={12} spacing={0} sx={{ mb: 2 }} height={'6vh'}>
          <Grid item xs={10}>
            {breadcrumbs &&
              <Box sx={{ backgroundColor: 'transparent', height: '100%', textAlign: 'right' }}>
                <CustomizedBreadcrumbs />
              </Box>
            }
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ backgroundColor: 'transparent', height: '100%', textAlign: 'left' }}></Box>
          </Grid>
        </Grid>
       }

      {/* קומה שניה */}
      {
        (search || group || btnCreate) &&
        <Grid container item xs={12} spacing={0} height={'6vh'}>

          <Grid container item xs={5} spacing={1} justifyContent="flex-start">
            <Grid item xs={8} >
              {search &&
                <Box sx={{ backgroundColor: 'transparent', height: '100%', width: '100%', textAlign: 'left' }}>
                  <SearchEntity width='100%' />
                </Box>
              }
            </Grid>
            <Grid item xs={4} >
              {search && filter &&
                <Box sx={{ backgroundColor: 'transparent', height: '100%', textAlign: 'left' }}>
                  <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button sx={{
                      backgroundColor: '#F9FAFC',
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="40px" viewBox="0 0 24 24" width="40px" fill="#5f6368"><g><path d="M0,0h24 M24,24H0" fill="none" /><path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" /><path d="M0,0h24v24H0V0z" fill="none" /></g></svg>
                    </Button>
                  </ButtonGroup>
                </Box>
              }
            </Grid>
          </Grid>
          {group &&
            <Grid item xs={2}>
              {group &&
                <Box sx={{ backgroundColor: 'transparent', height: '100%', textAlign: 'center' }}>
                  <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button sx={{
                      backgroundColor: 'rgba(255, 255, 240, 0.9)', color: theme.palette.primary.main,

                      backgroundColor: '#F9FAFC',
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="M316.67-316.67h146.66v-146.66H316.67v146.66Zm0-180h146.66v-146.66H316.67v146.66Zm180 180h146.66v-146.66H496.67v146.66Zm0-180h146.66v-146.66H496.67v146.66ZM146.67-160q-27 0-46.84-19.83Q80-199.67 80-226.67v-506.66q0-27 19.83-46.84Q119.67-800 146.67-800h666.66q27 0 46.84 19.83Q880-760.33 880-733.33v506.66q0 27-19.83 46.84Q840.33-160 813.33-160H146.67Zm0-66.67h666.66v-506.66H146.67v506.66Zm0 0v-506.66 506.66Z" /></svg>
                    </Button>
                    <Button sx={{
                      backgroundColor: 'rgba(255, 255, 240, 0.9)', color: theme.palette.primary.main,

                      backgroundColor: '#F9FAFC',
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="M153.33-240q-14.16 0-23.75-9.62-9.58-9.61-9.58-23.83 0-14.22 9.58-23.72 9.59-9.5 23.75-9.5h653.34q14.16 0 23.75 9.62 9.58 9.62 9.58 23.83 0 14.22-9.58 23.72-9.59 9.5-23.75 9.5H153.33Zm0-206.67q-14.16 0-23.75-9.61-9.58-9.62-9.58-23.84 0-14.21 9.58-23.71 9.59-9.5 23.75-9.5h653.34q14.16 0 23.75 9.61 9.58 9.62 9.58 23.84 0 14.21-9.58 23.71-9.59 9.5-23.75 9.5H153.33Zm0-206.66q-14.16 0-23.75-9.62-9.58-9.62-9.58-23.83 0-14.22 9.58-23.72 9.59-9.5 23.75-9.5h653.34q14.16 0 23.75 9.62 9.58 9.61 9.58 23.83 0 14.22-9.58 23.72-9.59 9.5-23.75 9.5H153.33Z" /></svg>
                    </Button>
                    <Button sx={{
                      backgroundColor: 'rgba(255, 255, 240, 0.9)', color: theme.palette.primary.main,

                      backgroundColor: '#F9FAFC',
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="M280-280h233.33v-233.33H280V-280Zm0-300h533.33v-233.33H280V-580Zm300 300h233.33v-233.33H580V-280Zm-300 66.67q-27 0-46.83-19.84Q213.33-253 213.33-280v-533.33q0-27 19.84-46.84Q253-880 280-880h533.33q27 0 46.84 19.83Q880-840.33 880-813.33V-280q0 27-19.83 46.83-19.84 19.84-46.84 19.84H280ZM146.67-80q-27 0-46.84-19.83Q80-119.67 80-146.67v-566.66q0-14.17 9.62-23.75 9.61-9.59 23.83-9.59 14.22 0 23.72 9.59 9.5 9.58 9.5 23.75v566.66h566.66q14.17 0 23.75 9.62 9.59 9.62 9.59 23.83 0 14.22-9.59 23.72-9.58 9.5-23.75 9.5H146.67Z" /></svg>
                    </Button>
                  </ButtonGroup>

                </Box>
              }
            </Grid>
          }

          <Grid container item xs={5} spacing={0} justifyContent="flex-end">
            <Grid item>
              {btnCreate &&
                <Box sx={{ backgroundColor: 'transparent', height: '100%', textAlign: 'left' }}>
                  <BtnGeneral />
                </Box>
              }
            </Grid>
          </Grid>
        </Grid>
      }

      {/* קומה שלישית */}
        <Grid container item xs={12} spacing={0} height={'6vh'}>
          <Grid item xs={4}>
            {search && filter &&
              <Box sx={{ backgroundColor: 'transparent', height: '100%', textAlign: 'right' }}>
                <ChipList initialChips={initialChips} onChipsChange={handleChipsChange} />
              </Box>
            }
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ backgroundColor: 'transparent', height: '100%', textAlign: 'center' }}></Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ backgroundColor: 'transparent', height: '100%', textAlign: 'left' }}></Box>
          </Grid>
        </Grid>
    </Grid>
  );
}

export default CustomGrid;