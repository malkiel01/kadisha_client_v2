import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import VideoLabelIcon from '@mui/icons-material/VideoLabel'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'

import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone'
import DifferenceTwoToneIcon from '@mui/icons-material/DifferenceTwoTone'
import PlaylistAddCheckTwoToneIcon from '@mui/icons-material/PlaylistAddCheckTwoTone'

// הפס
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
      right: 'calc(-50% + 20px)', // שינוי מ-left ל-right
      left: 'calc(50% + 20px)', // שינוי מ-right ל-left
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          `linear-gradient(95deg, ${theme.palette.success.light} 0%, ${theme.palette.success.light} 50%, ${theme.palette.success.main} 100%)`,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          `linear-gradient(95deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 50%, ${theme.palette.success.dark} 100%)`,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));
  
// האייקונים
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',

    // width: '40px', // קטן יותר מ-50px
    // height: '40px', // קטן יותר מ-50px

    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgba(153, 192, 25, 0.7) 0%, #99C019 50%, rgba(153, 192, 25, 0.7) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, #99C019 0%, #99C019 50%, #99C019 100%)',
    }),
  }));
  
function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <AssignmentTwoToneIcon style={{ fontSize: '25px' }}/>,
    // 1: <GroupAddIcon style={{ fontSize: '25px' }}/>,
    
    2: <DifferenceTwoToneIcon style={{ fontSize: '25px' }}/>,
    // 2: <VideoLabelIcon style={{ fontSize: '25px' }}/>,
    
    3: <PlaylistAddCheckTwoToneIcon style={{ fontSize: '25px' }}/>,
    // 3: <SettingsIcon style={{ fontSize: '25px' }}/>,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['הזנת פרטים', 'הוספת מסמכים', 'אישור'];

export default function CustomizedSteppers() {
  return (
    <Stack sx={{ width: '100%', direction: 'rtl' }} spacing={12}>
      <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label} sx={{ direction: 'rtl' }}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
                </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
