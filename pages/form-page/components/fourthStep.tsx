import {
    Button,
    FormHelperText,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import cx from 'classnames';
import { Box } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFieldArray } from 'react-hook-form';
import * as yup from 'yup';

import styles from '../formPage.module.css';
import useEffectOnce from '../../../hooks/useEffectOnce';
import useFormStorage from '../../../hooks/useFormStorage';

type LocationDef = {
    address: string;
    postCode: string;
};

interface FormInputDef {
    locationCount?: number;
    locations: LocationDef[];
}

interface FourthStepProps {
    setSubmitCurrentStep?: React.Dispatch<any>;
}

const schema = yup
    .object({
        locationCount: yup
            .number()
            .min(1, 'Please enter at least one location info'),
        locations: yup.array().of(
            yup.object({
                address: yup
                    .string()
                    .required('This field is required!')
                    .max(30, 'Input can not exceed 30 characters!'),
                postCode: yup
                    .string()
                    .required('This field is required!')
                    .matches(/^\d{4}$/, 'Please enter a valid post code'), // Post code for bd only
            })
        ),
    })
    .required();

const FourthStep = ({
    setSubmitCurrentStep,
}: FourthStepProps): ReactElement<FourthStepProps> => {
    const { register, control, errors, getValues, clearErrors, setValue } =
        useFormStorage<FormInputDef>(
            'fourthForm',
            schema,
            setSubmitCurrentStep
        );
    const { fields, append, remove, replace } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'locations', // unique name for your Field Array
    } as never);

    useEffect(() => {
        setValue('locationCount', fields.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fields.length]);

    useEffectOnce(() => {
        const values = getValues();

        if (values.locations.length === 0) {
            append({
                address: '',
                postCode: '',
            });
        } else {
            replace(values.locations);
        }
    });

    const handleAppend = () => {
        if (errors.locations?.message) {
            clearErrors('locations');
        }

        append({
            address: '',
            postCode: '',
        });
    };

    const handleRemove = (fieldIndex: number) => () => {
        remove(fieldIndex);
    };

    const getErrorProps = (
        name: keyof Omit<FormInputDef, 'locationCount'>,
        index: number,
        key: keyof LocationDef
    ) => ({
        error: Boolean(errors?.[name]?.[index]?.[key]),
        helperText: String(errors?.[name]?.[index]?.[key]?.message || ''),
    });

    return (
        <div className={styles.firstStepWrapper}>
            <Typography
                component="h2"
                variant="h5"
                className={cx('text-center', styles.title)}
            >
                Step 4
            </Typography>

            {fields.map((field, index) => (
                <Box key={field.id} marginBottom="2rem">
                    <Box
                        marginTop="1rem"
                        sx={{
                            '& .MuiTextField-root': { width: '100%' },
                        }}
                        display="flex"
                        alignItems="center"
                    >
                        <TextField
                            label="Address"
                            placeholder="Enter your address"
                            defaultValue=""
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                paddingRight: '0.5rem',
                            }}
                            {...register(`locations.${index}.address`)}
                            {...getErrorProps('locations', index, 'address')}
                        />

                        <TextField
                            label="Post Code"
                            placeholder="Enter the post code"
                            defaultValue=""
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                paddingLeft: '0.5rem',
                            }}
                            {...register(`locations.${index}.postCode`)}
                            {...getErrorProps('locations', index, 'postCode')}
                        />

                        <Box marginLeft="1rem">
                            <IconButton
                                aria-label="delete"
                                onClick={handleRemove(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            ))}

            {errors.locationCount && (
                <FormHelperText
                    error
                    sx={{
                        marginBottom: '1rem',
                        textAlign: 'center',
                    }}
                >
                    {errors.locationCount.message}
                </FormHelperText>
            )}

            <Button
                variant="outlined"
                onClick={handleAppend}
                startIcon={<AddCircleOutlineIcon />}
            >
                Add another location
            </Button>
        </div>
    );
};

export default FourthStep;
