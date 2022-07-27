import { Button, IconButton, TextField, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import cx from 'classnames';
import { Box } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFieldArray, useForm } from 'react-hook-form';

import styles from '../formPage.module.css';
import useEffectOnce from '../../../hooks/useEffectOnce';

type FormInputs = {
    address: string;
    postCode: string;
};

const FourthStep = (): ReactElement => {
    const { control, register } = useForm<FormInputs>();
    const { fields, append, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'test', // unique name for your Field Array
    } as never);

    useEffectOnce(() => {
        append({});
    });

    const handleAppend = () => {
        append({});
    };

    const handleRemove = (fieldIndex: number) => () => {
        remove(fieldIndex);
    };

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

            <Button
                variant="outlined"
                onClick={handleAppend}
                startIcon={<AddCircleOutlineIcon />}
            >
                Add another address
            </Button>
        </div>
    );
};

export default FourthStep;
