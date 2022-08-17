import { MenuItem, TextField, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import cx from 'classnames';
import { Box } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage } from 'react-use';

import styles from '../formPage.module.css';
import useEffectOnce from '../../../hooks/useEffectOnce';

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
        gender: yup.string().required('This field is required!'),
        dob: yup
            .string()
            .nullable()
            .required('This field is required!')
            .test('DOB', 'Must be at least 18 years old', (value) => {
                return dayjs().diff(dayjs(value), 'years') >= 18;
            }),
    })
    .required();

const FirstStep = ({
    setSubmitCurrentStep,
}: FirstStepProps): ReactElement<FirstStepProps> => {
    const [value, setValue] = useLocalStorage('firstForm', '');
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormInputDef>({
        resolver: yupResolver(schema),
        reValidateMode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<FormInputDef> = (data) => {
        setValue(JSON.stringify(data));
    };

    const submit = async () => {
        let success = true;

        await handleSubmit(onSubmit, (error) => {
            if (error) {
                console.log(error);
                success = false;
            }
        })();

        return success;
    };

    useEffectOnce(() => {
        reset(value ? JSON.parse(value) : {});
        setSubmitCurrentStep?.(
            // Return as callback function
            () => submit
        );
    });

    const getErrorProps = (name: keyof FormInputDef) => ({
        error: Boolean(errors?.[name]),
        helperText: errors?.[name]?.message,
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
                    defaultValue={null}
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
