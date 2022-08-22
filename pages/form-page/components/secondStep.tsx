import {
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import cx from 'classnames';
import { Box } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import * as yup from 'yup';

import styles from '../formPage.module.css';
import useFormStorage from '../../../hooks/useFormStorage';
import { Controller } from 'react-hook-form';
import useEffectOnce from '../../../hooks/useEffectOnce';
import dayjs from 'dayjs';

interface SecondStepProps {
    setSubmitCurrentStep?: React.Dispatch<any>;
}

type InstituteInputDef = {
    institutionName: string;
    passingYear: string;
    result: string;
};

interface FormInputDef {
    schoolSelected: boolean;
    collegeSelected: boolean;
    universitySelected: boolean;
    school?: InstituteInputDef;
    college?: InstituteInputDef;
    university?: InstituteInputDef;
}

const childSchema = {
    institutionName: yup
        .string()
        .required('This field is required!')
        .max(50, 'Can not exceed 50 characters'),
    result: yup
        .number()
        .transform((value, originalValue) => {
            if (originalValue === '') {
                return null;
            }

            return value;
        })
        .required('This field is required!')
        .typeError('Please enter a valid number')
        .nullable()
        .test('result', 'Result can not exceed 5.00', (value) => {
            return Number(value) <= 5;
        }),
    passingYear: yup
        .string()
        .nullable()
        .required('This field is required!')
        .test('validateDate', 'Must be a valid date', (value) => {
            return dayjs(value).isValid();
        })
        .test('notFuture', 'Date can not be in future!', (value) => {
            return !dayjs(value).isAfter(dayjs());
        }),
};

const schema = yup
    .object({
        schoolSelected: yup.boolean(),
        collegeSelected: yup.boolean(),
        universitySelected: yup.boolean(),
        school: yup.object().when('schoolSelected', {
            is: true,
            then: yup.object(childSchema),
        }),
        college: yup.object().when('collegeSelected', {
            is: true,
            then: yup.object(childSchema),
        }),
        university: yup.object().when('universitySelected', {
            is: true,
            then: yup.object(childSchema),
        }),
    })
    .required();

const SecondStep = ({
    setSubmitCurrentStep,
}: SecondStepProps): ReactElement<SecondStepProps> => {
    const {
        register,
        control,
        errors,
        storageValue,
        watch,
        reset,
        getValues,
        setValue,
    } = useFormStorage<FormInputDef>(
        'secondForm',
        schema,
        setSubmitCurrentStep
    );

    watch(['schoolSelected', 'collegeSelected', 'universitySelected']); // when pass nothing as argument, you are watching everything
    const { schoolSelected, collegeSelected, universitySelected } = getValues();

    const parseSelections = () => {
        if (storageValue) {
            const parsedValue = storageValue;
            const keys = Object.keys(parsedValue);

            keys.forEach((key) => {
                if (key === 'school') {
                    setValue('schoolSelected', true);
                }

                if (key === 'college') {
                    setValue('collegeSelected', true);
                }

                if (key === 'university') {
                    setValue('universitySelected', true);
                }
            });
        }
    };

    // Remove unnecessary form
    useEffect(() => {
        const existingValue = getValues();

        if (schoolSelected === false) {
            delete existingValue.school;
        }

        if (collegeSelected === false) {
            delete existingValue.college;
        }

        if (universitySelected === false) {
            delete existingValue.university;
        }

        reset(existingValue, { keepErrors: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schoolSelected, collegeSelected, universitySelected]);

    useEffectOnce(() => {
        parseSelections();
    });

    const getErrorProps = (
        name: keyof Omit<
            FormInputDef,
            'schoolSelected' | 'collegeSelected' | 'universitySelected'
        >,
        key: keyof InstituteInputDef
    ) => ({
        error: Boolean(errors?.[name]?.[key]),
        helperText: String(errors?.[name]?.[key]?.message || ''),
    });

    const renderInputs = (
        name: keyof Omit<
            FormInputDef,
            'schoolSelected' | 'collegeSelected' | 'universitySelected'
        >
    ) => (
        <>
            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
            >
                <TextField
                    required
                    label="Institution Name"
                    placeholder="Enter the institution name"
                    defaultValue=""
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register(`${name}.institutionName`)}
                    {...getErrorProps(name, 'institutionName')}
                />
            </Box>
            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
            >
                <Controller
                    name={`${name}.passingYear`}
                    control={control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }: any) => (
                        <DesktopDatePicker
                            disableFuture
                            label="Passing Year"
                            inputFormat="YYYY"
                            renderInput={(params) => (
                                <TextField
                                    onKeyDown={(e) => e.preventDefault()}
                                    required
                                    {...params}
                                    {...getErrorProps(name, 'passingYear')}
                                />
                            )}
                            views={['year']}
                            {...field}
                        />
                    )}
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
                    label="Result"
                    placeholder="Enter your result"
                    defaultValue=""
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register(`${name}.result`)}
                    {...getErrorProps(name, 'result')}
                />
            </Box>
        </>
    );

    return (
        <div className={styles.firstStepWrapper}>
            <Typography
                component="h2"
                variant="h5"
                className={cx('text-center', styles.title)}
            >
                Step 2
            </Typography>
            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
                textAlign="left"
            >
                <FormControlLabel
                    checked={Boolean(schoolSelected)}
                    control={<Checkbox {...register('schoolSelected')} />}
                    label="School"
                />
            </Box>
            {schoolSelected && renderInputs('school')}

            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
                textAlign="left"
            >
                <FormControlLabel
                    checked={Boolean(collegeSelected)}
                    control={<Checkbox {...register('collegeSelected')} />}
                    label="College"
                />
            </Box>
            {collegeSelected && renderInputs('college')}

            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
                textAlign="left"
            >
                <FormControlLabel
                    checked={Boolean(universitySelected)}
                    control={<Checkbox {...register('universitySelected')} />}
                    label="University"
                />
            </Box>
            {universitySelected && renderInputs('university')}
        </div>
    );
};

export default SecondStep;
