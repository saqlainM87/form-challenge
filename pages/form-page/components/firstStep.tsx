import { MenuItem, TextField, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import cx from 'classnames';
import { Box } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import styles from '../formPage.module.css';
import dayjs from 'dayjs';

const FirstStep = (): ReactElement => {
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
                    '& .MuiTextField-root': { width: '15rem' },
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
                />
            </Box>
            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '15rem' },
                }}
            >
                <TextField
                    required
                    label="Last Name"
                    placeholder="Enter your last name"
                    defaultValue=""
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '15rem' },
                }}
            >
                <TextField
                    select
                    required
                    label="Gender"
                    placeholder="Select your gender"
                    defaultValue=""
                    helperText="Please select your gender"
                >
                    <MenuItem key="male" value="male">
                        Male
                    </MenuItem>

                    <MenuItem key="female" value="female">
                        Female
                    </MenuItem>
                </TextField>
            </Box>
            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '15rem' },
                }}
            >
                <DesktopDatePicker
                    disableFuture
                    value={dayjs()}
                    onChange={() => {
                        //
                    }}
                    label="Date of birth"
                    inputFormat="MM/DD/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                />
            </Box>
        </div>
    );
};

export default FirstStep;
