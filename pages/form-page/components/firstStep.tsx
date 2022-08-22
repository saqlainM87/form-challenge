import { MenuItem, TextField, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import cx from 'classnames';
import { Box } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import * as yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import { Controller } from 'react-hook-form';

import styles from '../formPage.module.css';
import useFormStorage from '../../../hooks/useFormStorage';

enum GenderEnum {
    FEMALE = 'female',
    MALE = 'male',
}

interface FormInputDef {
    firstName: String;
    lastName: string;
    gender: string | null;
    dob: Dayjs | null;
}

interface FirstStepProps {
    setSubmitCurrentStep?: React.Dispatch<any>;
}

const schema = yup
    .object({
        firstName: yup
            .string()
            .required('This field is required!')
            .matches(/^[A-Za-z \.]*$/, 'Please enter a valid name')
            .max(20, 'Can not exceed 20 characters'),
        lastName: yup
            .string()
            .required('This field is required!')
            .matches(/^[A-Za-z \.]*$/, 'Please enter a valid name')
            .max(20, 'Can not exceed 20 characters'),
        gender: yup.string().nullable().required('This field is required!'),
        dob: yup
            .string()
            .nullable()
            .required('This field is required!')
            .test('validDate', 'Must be a valid date', (value) => {
                return dayjs(value).isValid();
            })
            .test('mustBe18', 'Must be at least 18 years old', (value) => {
                return dayjs().diff(dayjs(value), 'years') >= 18;
            }),
    })
    .required();

const FirstStep = ({
    setSubmitCurrentStep,
}: FirstStepProps): ReactElement<FirstStepProps> => {
    const { register, control, errors } = useFormStorage<FormInputDef>(
        'firstForm',
        schema,
        setSubmitCurrentStep
    );

    const getErrorProps = (name: keyof FormInputDef) => ({
        error: Boolean(errors?.[name]),
        helperText: String(errors?.[name]?.message || ''),
    });

    return (
        <div className={styles.firstStepWrapper}>
            <Typography
                component="h2"
                variant="h5"
                className={cx('text-center', styles.title)}
            >
                Step 1
            </Typography>

            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
            >
                <TextField
                    required
                    label="First Name"
                    placeholder="Enter your first name"
                    defaultValue=""
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register('firstName')}
                    {...getErrorProps('firstName')}
                />
            </Box>
            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
            >
                <TextField
                    required
                    label="Last Name"
                    placeholder="Enter your last name"
                    defaultValue={null}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register('lastName')}
                    {...getErrorProps('lastName')}
                />
            </Box>
            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
            >
                <Controller
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }: any) => (
                        <TextField
                            required
                            select
                            label="Gender"
                            placeholder="Select your gender"
                            {...field}
                            {...getErrorProps('gender')}
                        >
                            <MenuItem value={GenderEnum.MALE}>Male</MenuItem>
                            <MenuItem value={GenderEnum.FEMALE}>
                                Female
                            </MenuItem>
                        </TextField>
                    )}
                />
            </Box>
            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
            >
                <Controller
                    name="dob"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={null}
                    render={({ field }) => (
                        <DesktopDatePicker
                            disableFuture
                            label="Date of birth"
                            inputFormat="MM/DD/YYYY"
                            renderInput={(params) => (
                                <TextField
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    required
                                    {...params}
                                    {...getErrorProps('dob')}
                                />
                            )}
                            {...field}
                        />
                    )}
                />
            </Box>
        </div>
    );
};

export default FirstStep;
