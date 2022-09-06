import { Button, FormHelperText, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import cx from 'classnames';
import { Box } from '@mui/system';
import * as yup from 'yup';

import styles from '../formPage.module.css';
import useFormStorage from '../../../hooks/useFormStorage';
import useEffectOnce from '../../../hooks/useEffectOnce';

interface ThirdsStepProps {
    setSubmitCurrentStep?: React.Dispatch<any>;
}

interface FormInputDef {
    profilePictureDataURL?: string;
    profilePicture: File[];
}

const schema = yup
    .object({
        profilePicture: yup
            .mixed()
            .test('required', 'This field is required!', (value) => {
                return value && value.length;
            })
            .test(
                'fileSize',
                'The file size can not exceed 2 mb!',
                (value, context) => {
                    return value && value[0] && value[0].size <= 2000000; // 2mb
                }
            )
            .test('type', 'File should be of type image!', function (value) {
                return value && value[0] && value[0]?.type?.includes('image/');
            }),
    })
    .required();

const ThirdStep = ({
    setSubmitCurrentStep,
}: ThirdsStepProps): ReactElement<ThirdsStepProps> => {
    const handleSubmit = (data: FormInputDef) => {
        const file = data.profilePicture;
        const reader = new FileReader();

        reader.readAsDataURL(file[0]);

        reader.onloadend = () => {
            setLocalStorageValue({
                profilePictureDataURL: reader.result,
                profilePicture: [
                    {
                        name: file[0].name,
                        type: file[0].type,
                    },
                ],
            });
        };
    };

    const {
        register,
        errors,
        watch,
        setLocalStorageValue,
        storageValue,
        reset,
    } = useFormStorage<FormInputDef>(
        'thirdForm',
        schema,
        setSubmitCurrentStep,
        handleSubmit
    );

    const { profilePicture } = watch();

    const uploadedFile = profilePicture?.[0];

    useEffectOnce(async () => {
        const dataURL = storageValue.profilePictureDataURL;
        const metaData = storageValue.profilePicture?.[0];

        if (dataURL) {
            const blob = await (await fetch(dataURL)).blob();
            const file = new File([blob], metaData?.name, {
                type: metaData?.type,
            });

            reset({ profilePicture: [file] });
        }
    });

    return (
        <div className={styles.firstStepWrapper}>
            <Typography
                component="h2"
                variant="h5"
                className={cx('text-center', styles.title)}
            >
                Step 3
            </Typography>

            {uploadedFile && (
                <Box
                    sx={{
                        overflowWrap: 'break-word',
                    }}
                >
                    <span>
                        {uploadedFile.name} ({uploadedFile?.size / 1000} kb)
                    </span>
                </Box>
            )}

            <Box
                marginTop="1rem"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                {!uploadedFile?.name && (
                    <span style={{ marginBottom: '1rem' }}>
                        Upload you profile picture
                    </span>
                )}

                <Button variant="contained" component="label">
                    <span>Select</span>
                    <input hidden type="file" {...register('profilePicture')} />
                </Button>

                {errors?.profilePicture && (
                    <FormHelperText error>
                        {errors?.profilePicture?.message}
                    </FormHelperText>
                )}
            </Box>
        </div>
    );
};

export default ThirdStep;
