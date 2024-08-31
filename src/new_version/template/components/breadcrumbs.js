import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../../App';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function CustomizedBreadcrumbs() {
  const navigate = useNavigate();
  const { breadcrumbs } = useContext(GlobalContext); // קבלת breadcrumbs מהקונטקסט

  const handleClick = (url, state = {}) => {
    navigate(url, { state });
  };
  
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((item, index) => (
          <StyledBreadcrumb
            key={item.id}
            component="a"
            label={item.name}
            onClick={() => handleClick(item.url, item.state)}
            icon={index === 0 ? <HomeIcon fontSize="small" /> : (item?.icon ? item?.icon : null)}
          />
        ))}
      </Breadcrumbs>
    </div>
  )
}
