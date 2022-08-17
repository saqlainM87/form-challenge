import { useEffect, useRef } from 'react';

const useEffectOnce = (callback: any) => {
    const effectDone = useRef<boolean>(false);

    useEffect(() => {
        if (!effectDone.current) {
            effectDone.current = true;

            callback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useEffectOnce;
