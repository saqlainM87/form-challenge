import { Button, TextField, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import cx from 'classnames';
import { Box } from '@mui/system';

import styles from '../formPage.module.css';

const ThirdStep = (): ReactElement => {
    return (
        <div className={styles.firstStepWrapper}>
            <Typography
                component="h2"
                variant="h5"
                className={cx('text-center', styles.title)}
            >
                Step 3
            </Typography>

            <Box>
                <span>Image.jpeg (200kb)</span>
            </Box>

            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
                display="flex"
                justifyContent={'space-around'}
                alignItems="center"
            >
                <span>Upload you profile picture</span>
                <Button variant="contained" component="label">
                    Select
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
            </Box>
        </div>
    );
};

export default ThirdStep;
