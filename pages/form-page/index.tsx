import { Grid } from '@mui/material';
import { NextPage } from 'next';
import FirstStep from './components/firstStep';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocalStorage } from 'react-use';
import { useEffect, useState } from 'react';

import useEffectOnce from '../../hooks/useEffectOnce';
import styles from './formPage.module.css';
import SecondStep from './components/secondStep';
import ThirdStep from './components/thirdStep';
import FourthStep from './components/fourthStep';

const steps = [
    'Basic Information',
    'Educational Information',
    'Profile Picture',
    'Location Information',
    'Confirm',
];

const FormPage: NextPage = () => {
    const [savedActiveStep, setSavedActiveStep] = useLocalStorage(
        'activeStep',
        0
    );
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const [submitCurrentStep, setSubmitCurrentStep] =
        useState<() => Promise<Boolean>>(); // State for storing form step submitter

    useEffectOnce(() => {
        if (savedActiveStep) {
            setActiveStep(savedActiveStep);
        }
    });

    useEffect(() => {
        setSavedActiveStep(activeStep);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeStep]);

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = async () => {
        const success = await submitCurrentStep?.();

        if (submitCurrentStep && !success) {
            return;
        }

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box className={styles.formPageWrapper} sx={{ width: '60%' }}>
            <div className={styles.form}>
                <Stepper
                    className={styles.stepper}
                    activeStep={activeStep}
                    alternativeLabel
                >
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: ReactNode;
                        } = {};

                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">
                                    Optional
                                </Typography>
                            );
                        }

                        if (index === 3) {
                            labelProps.optional = (
                                <Typography variant="caption">
                                    At least one
                                </Typography>
                            );
                        }

                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel
                                    className="text-center"
                                    {...labelProps}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 2,
                            }}
                        >
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                        }}
                        padding="2rem"
                    >
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            variant="contained"
                        >
                            Back
                        </Button>

                        <Grid container justifyContent="center">
                            <Grid item xs={8}>
                                {activeStep === 0 && (
                                    <FirstStep
                                        setSubmitCurrentStep={
                                            setSubmitCurrentStep
                                        }
                                    />
                                )}
                                {activeStep === 1 && (
                                    <SecondStep
                                        setSubmitCurrentStep={
                                            setSubmitCurrentStep
                                        }
                                    />
                                )}
                                {activeStep === 2 && (
                                    <ThirdStep
                                        setSubmitCurrentStep={
                                            setSubmitCurrentStep
                                        }
                                    />
                                )}
                                {activeStep === 3 && (
                                    <FourthStep
                                        setSubmitCurrentStep={
                                            setSubmitCurrentStep
                                        }
                                    />
                                )}
                            </Grid>
                        </Grid>

                        <Button onClick={handleNext} variant="contained">
                            {activeStep === steps.length - 1
                                ? 'Finish'
                                : 'Next'}
                        </Button>
                    </Box>
                )}
            </div>
        </Box>
    );
};

export default FormPage;
