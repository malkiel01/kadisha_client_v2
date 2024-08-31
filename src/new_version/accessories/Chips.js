import React, { useEffect, useState } from 'react'
import { Card, Grid, Chip } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import MenuPopup from './menuPopup';

const SelectItem = ({name = null, setStatus = (e) => {console.log(e)}}) => {
    return (
            <div
            onClick={() => {
                setStatus(true, name)
            }}
            style={{   
              direction:'rtl',
              textAlign: 'right',
              width: '100%', /* כל הרוחב של הקונטיינר */
              height: '100%', /* כל הגובה של הקונטיינר */
            }}>
              <span>{name}</span>
          </div>
    );
}

const Chips = ({data = [], setData = () => {}}) => {

    function updateStatusByName(nameToUpdate, newStatus) {
        setData(prevData => {
            return prevData.map(item => {
                if (item.name === nameToUpdate) {
                    return {
                        ...item,
                        status: newStatus
                    };
                }
                return item;
            });
        });
    }
    
    const settings = data?.map((chip, index) => {
                return (<SelectItem key={index} name={chip.name} status={chip.status} setStatus={
                    (status, name) => {
                        updateStatusByName(name,status)
                    }
                }/>)
            })

    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    }

    return (
        <Grid container style={{ marginBottom: '16px' }}>
        <Grid item >
            <Card style={{maxWidth: '60px'}}>
                <button onClick={handleOpenUserMenu} style={{margin: '5px', borderRadius: '5px', minWidth: '50px', border: 'none', 
                backgroundColor: '#fff'
                }}><FilterAltIcon sx={{ fontSize: 30 , color: '#1B4C53', backgroundColor: 'none'}}/></button>
            </Card>
            </Grid>
        <MenuPopup data={settings} anchorElUser={anchorElUser} setAnchorElUser={setAnchorElUser} />
        <Grid item >
        {data.map((chip, index) => {
            if (chip.status) {
                return (
                    <Chip key={index}
                        onDelete={() => {
                            const newData = data.map(item => {
                                if (item.name === chip.name) {
                                  return { ...item, status: false };
                                }
                                return item;
                              });
                              setData(newData)}}
                        sx={{
                            height: 'auto',
                            '& .MuiChip-label': {
                                display: 'block',
                                whiteSpace: 'normal',
                            },
                            padding: '5px',
                            margin: '5px',
                            borderRadius: '25px',
                            paddingLeft: '20px'
                        }}
                        label={chip.name}
                    />
                )
            }
        })}
        </Grid>
    </Grid>
    );
}

export default Chips;
