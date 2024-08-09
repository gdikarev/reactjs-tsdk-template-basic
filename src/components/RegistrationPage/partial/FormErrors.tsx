import { useFormContext } from 'react-hook-form';
import { Snackbar, Alert } from '@mui/material';
import {useEffect, useState} from "react";

export const FormErrors = () => {
    const { formState: { errors }, handleSubmit } = useFormContext();
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        setErrorText('');
        if (Object.keys(errors).length > 0) {
            const message = Object.values(errors)
                .filter(error => error?.message)
                .map(error => error?.message || '')
                .join(', ');
            setErrorText(message);
        } else {
            setErrorText('');
        }
    }, [errors, handleSubmit]);

    const handleClose = () => {
        setErrorText('');
    };

    return (
        <Snackbar
            open={Boolean(errorText)}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorText}
            </Alert>
        </Snackbar>
    );
};