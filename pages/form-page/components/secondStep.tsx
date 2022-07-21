import {
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material';
import React, { ReactElement, useState } from 'react';
import cx from 'classnames';
import { Box } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import styles from '../formPage.module.css';
import dayjs from 'dayjs';

const SecondStep = (): ReactElement => {
    const [schoolSelected, setSchoolSelected] = useState(false);
    const [collegeSelected, setCollegeSelected] = useState(false);
    const [universitySelected, setUniversitySelected] = useState(false);

    const renderInputs = () => (
        <>
            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '15rem' },
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
                />
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
                    label="Passing Year"
                    inputFormat="YYYY"
                    renderInput={(params) => <TextField {...params} />}
                    views={['year']}
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
                    label="Result"
                    placeholder="Enter your result"
                    defaultValue=""
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                    '& .MuiTextField-root': { width: '15rem' },
                }}
                textAlign="left"
            >
                <FormControlLabel
                    onChange={() => {
                        setSchoolSelected((state) => !state);
                    }}
                    value={schoolSelected}
                    control={<Checkbox />}
                    label="School"
                />
            </Box>
            {schoolSelected && renderInputs()}

            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '15rem' },
                }}
                textAlign="left"
            >
                <FormControlLabel
                    onChange={() => {
                        setCollegeSelected((state) => !state);
                    }}
                    value={collegeSelected}
                    control={<Checkbox />}
                    label="College"
                />
            </Box>
            {collegeSelected && renderInputs()}

            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '15rem' },
                }}
                textAlign="left"
            >
                <FormControlLabel
                    onChange={() => {
                        setUniversitySelected((state) => !state);
                    }}
                    value={universitySelected}
                    control={<Checkbox />}
                    label="University"
                />
            </Box>
            {universitySelected && renderInputs()}
        </div>
    );
};

export default SecondStep;
