import { useState } from 'react';

import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
 Typography
} from '@mui/material';
import { BOARD_STATUSES } from '../../mocks/board';
import { IBoardSettings } from '../../interfaces/boardSettings';

const BoardStepper = (props: { board: IBoardSettings }) => {
    const { board } = props;
    const steps = [BOARD_STATUSES[1], BOARD_STATUSES[2]];
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
      <Box sx={{ width: '50%' }}>
        <Typography variant='h5'>{board.name}</Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {`${board.name} archived`}
                </Typography>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Archive board' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    );
};

export default BoardStepper;
