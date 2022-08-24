import { Avatar, TextField, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import cx from 'classnames';
import { Box } from '@mui/system';
import dayjs from 'dayjs';

import styles from '../formPage.module.css';

const ConfirmForm = (): ReactElement => {
    const firstFormValues = JSON.parse(localStorage.getItem('firstForm') ?? '');
    const secondFormValues = JSON.parse(
        localStorage.getItem('secondForm') ?? ''
    );
    const thirdFormValues = JSON.parse(localStorage.getItem('thirdForm') ?? '');
    const fourthFormValues = JSON.parse(
        localStorage.getItem('fourthForm') ?? ''
    );

    const capitalizeFirstLetter = (string?: string) => {
        if (!string) {
            return '';
        }

        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderInstitute = (institute: string, data?: any) => {
        if (!data) {
            return null;
        }

        return (
            <Box>
                <h5 style={{ textAlign: 'left' }}>{institute}</h5>

                <Box
                    marginTop="1rem"
                    sx={{
                        '& .MuiTextField-root': { width: '100%' },
                    }}
                >
                    <TextField
                        required
                        label="Institution Name"
                        value={data?.institutionName}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
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
                        label="Passing Year"
                        value={dayjs(data?.passingYear).format('YYYY')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
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
                        value={data?.result}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                    />
                </Box>
            </Box>
        );
    };

    const renderLocations = (locations: any[]) => {
        return (
            <Box marginTop="1rem">
                {locations.map((location, index) => (
                    <Box key={index}>
                        <h5 style={{ textAlign: 'left' }}>
                            Location {index + 1}
                        </h5>

                        <Box
                            marginTop="1rem"
                            sx={{
                                '& .MuiTextField-root': { width: '100%' },
                            }}
                        >
                            <TextField
                                required
                                label="Address"
                                value={location?.address}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled
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
                                label="Post Code"
                                value={location?.postCode}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
        );
    };

    return (
        <div className={styles.firstStepWrapper}>
            <Typography
                component="h2"
                variant="h5"
                className={cx('text-center', styles.title)}
            >
                Finalization
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
                    value={firstFormValues?.firstName}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    disabled
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
                    value={firstFormValues?.lastName}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    disabled
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
                    label="Gender"
                    value={capitalizeFirstLetter(firstFormValues?.gender)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    disabled
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
                    label="Date of Birth"
                    value={dayjs(firstFormValues?.dob).format('MM/DD/YYYY')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    disabled
                />
            </Box>

            {renderInstitute('School', secondFormValues.school)}
            {renderInstitute('College', secondFormValues.college)}
            {renderInstitute('University', secondFormValues.university)}

            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
            >
                <h5 style={{ textAlign: 'left' }}>Profile Picture</h5>

                <Avatar
                    sx={{ width: 128, height: 128 }}
                    alt="profilePicture"
                    src={thirdFormValues.profilePictureDataURL}
                    variant="rounded"
                    imgProps={{
                        sx: {
                            objectPosition: 'top',
                        },
                    }}
                />
            </Box>

            {renderLocations(fourthFormValues.locations)}
        </div>
    );
};

export default ConfirmForm;
