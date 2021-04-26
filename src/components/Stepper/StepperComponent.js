import React from 'react'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
});

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
})(StepConnector);
  

const ColorlibStepIcon = (current, activeStep) => {
    const classes = useColorlibStepIconStyles()
    const icons = {
        "1": <SettingsIcon />,
        "2": <GroupAddIcon />,
        "3": <VideoLabelIcon />,
    }
  
    return (
      <div className = {current === activeStep ? classes.active : classes.root}>
        {icons[`${current}`]}
      </div>
    )
}

const StepperComponent = ({steps, activeStep}) => {
    return (
        <Stepper alternativeLabel activeStep = {activeStep} connector={<ColorlibConnector />}>
            {
                steps.map((label, idx) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent = {() =>ColorlibStepIcon(idx+1, activeStep)}>{label}</StepLabel>
                    </Step>
                ))
            }
      </Stepper>
    )
}

export default StepperComponent
