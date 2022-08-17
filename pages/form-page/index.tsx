import { Grid } from '@mui/material';
import { NextPage } from 'next';
import FirstStep from './components/firstStep';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './formPage.module.css';
import SecondStep from './components/secondStep';
import ThirdStep from './components/thirdStep';
import FourthStep from './components/fourthStep';
import { SubmitHandler } from 'react-hook-form';

const steps = [
    'Basic information',
    'Educational information',
    'Profile picture',
    'Contact information',
    'Confirm',
];

const FormPage: NextPage = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const [submitCurrentStep, setSubmitCurrentStep] =
        React.useState<() => Promise<Boolean>>(); // State for storing form step submitter

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const onSubmit: SubmitHandler<any> = (data) => console.log(data);

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
                            optional?: React.ReactNode;
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
                                {activeStep === 1 && <SecondStep />}
                                {activeStep === 2 && <ThirdStep />}
                                {activeStep === 3 && <FourthStep />}
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
