import {UserData} from "@/components/RegistrationPage/UserData.tsx";
import {UserPhotos} from "@/components/RegistrationPage/UserPhotos.tsx";
import {UserPreferences} from "@/components/RegistrationPage/UserPreferences.tsx";
import {useMultistepForm} from "@/hooks/useMultistepForm.tsx";

import {FC, useEffect, useState} from 'react';
import { Box, Container } from '@mui/material';

import {initBackButton, initMainButton, retrieveLaunchParams} from '@telegram-apps/sdk';
import {useAuth} from "@/hooks/useAuth.tsx";

import { useForm, FormProvider } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";

import {UserRegistrationData} from "@/shared/type/userRegistrationData.ts";
import {getStepValidationSchema} from "@/validationSchemas/Registration/RegistrationPageSchemas.tsx";

import {FormErrors} from "@/components/RegistrationPage/partial/FormErrors.tsx";

const { initData } = retrieveLaunchParams();

const INIT_DATA: UserRegistrationData = {
    name: initData?.user?.firstName ?? "",
    email: "",
    gender: "",
    search_gender: "",
    birthday: "",
    locale: "en-US",
    search_age_from: 18,
    search_age_to: 60,
    photos: []
}

export const RegistrationPage: FC = () => {
    const [data, setData] = useState(INIT_DATA)

    const { login } = useAuth();

    const {
        steps,
        currentStepIndex,
        step,
        isLastStep,
        isFirstStep,
        back,
        next
    } = useMultistepForm([
        // eslint-disable-next-line react/jsx-key
        <UserData {...data} updateFields={updateFields}/>,
        // eslint-disable-next-line react/jsx-key
        <UserPhotos {...data} updateFields={updateFields}/>,
        // eslint-disable-next-line react/jsx-key
        <UserPreferences {...data} updateFields={updateFields}/>
    ])

    const validationSchema = getStepValidationSchema(data, currentStepIndex);

    const methods = useForm({
        resolver: validationSchema ? zodResolver(validationSchema) : undefined,
        defaultValues: data
    });

    const [mainButton] = initMainButton();
    const [backButton] = initBackButton();

    const onSubmit = (): void => {
        console.log(data)
        next()
        if (isLastStep) {
            mainButton.hide()
            backButton.hide()
            // TODO send registration request
            login()
        }
    };

    const onBack = (): void => {
        back()
    };

    useEffect(() => {
        mainButton.enable()
        mainButton.show()
        mainButton.setText(isLastStep ? 'Finish' : 'Continue');

        const handleClick = methods.handleSubmit(onSubmit);

        mainButton.on('click', handleClick);

        return () => {
            mainButton.off('click', handleClick);
        };
    }, [mainButton]);

    useEffect(() => {
        if (!isFirstStep) backButton.show()
        backButton.on('click', onBack);

        if (isFirstStep) backButton.hide()

        return () => {
            backButton.off('click', onBack);
        };
    }, [backButton]);

    function updateFields(fields: Partial<UserRegistrationData>) {
        setData(prev => {
            return { ...prev, ...fields }
        })
    }

    return (
        <FormProvider {...methods}>
            <form
                  style={{
                      height: '90vh',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      overflow: 'hidden'
                  }}>
                <Box position="absolute" top={8} right={8}>
                    {currentStepIndex + 1} / {steps.length}
                </Box>
                <Container maxWidth="xs"
                           style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Box flex={1} display="flex" alignItems="center" justifyContent="center">
                        {step}
                    </Box>
                </Container>
            </form>
            <FormErrors />
        </FormProvider>
    );
};
