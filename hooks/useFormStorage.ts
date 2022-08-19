import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage } from 'react-use';
import useEffectOnce from './useEffectOnce';

const useFormStorage = <T = any>(
    storageKey: string,
    schema: any,
    setSubmitCurrentStep?: React.Dispatch<any>,
    formOptions?: any
) => {
    const [localStorageValue, setLocalStorageValue] = useLocalStorage<any>(
        storageKey,
        ''
    );
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        getValues,
        watch,
        setValue,
        unregister,
    } = useForm<T>({
        resolver: yupResolver(schema),
        reValidateMode: 'onSubmit',
        ...formOptions,
    });

    const onSubmit: SubmitHandler<T> = (data) => {
        setLocalStorageValue(data);
    };

    const submit = async () => {
        let success = true;

        await handleSubmit(onSubmit, (error) => {
            if (error) {
                success = false;
            }
        })();

        return success;
    };

    useEffectOnce(() => {
        reset(localStorageValue ? localStorageValue : {}); // Set initial form values here to prevent hydration issue
        setSubmitCurrentStep?.(
            // Return as callback function
            () => submit
        );
    });

    return {
        register,
        handleSubmit,
        control,
        errors,
        getValues,
        storageValue: localStorageValue,
        reset,
        watch,
        setValue,
        unregister,
    };
};

export default useFormStorage;
