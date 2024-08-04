import {UserData} from "@/components/RegistrationPage/UserData.tsx";
import {UserPhotos} from "@/components/RegistrationPage/UserPhotos.tsx";
import {UserPreferences} from "@/components/RegistrationPage/UserPreferences.tsx";
import {useMultistepForm} from "@/hooks/useMultistepForm.tsx";
import {FileData} from "@/shared/interface/registration.ts";

import {FC, useEffect, useState} from 'react';
import { Box, Container } from '@mui/material';

import {initBackButton, initMainButton, retrieveLaunchParams} from '@telegram-apps/sdk';
import {useAuth} from "@/hooks/useAuth.tsx";

import { useForm } from 'react-hook-form';

type FormData = {
    name: string,
    email: string,
    gender: string,
    search_gender: string,
    birthday: string,
    locale: string,
    search_age_from: number,
    search_age_to: number,
    photos: Array<FileData>
}

const { initData } = retrieveLaunchParams();

const INIT_DATA: FormData = {
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

    const { handleSubmit} = useForm({
    });

    const [mainButton] = initMainButton();
    const [backButton] = initBackButton();

    const onSubmit = (): void => {
        next()
        if (isLastStep) {
            // TODO send registration request
            login()
        }
    };

    const onBack = (): void => {
        back()
    };

    useEffect(() => {
        mainButton.show()
        mainButton.setText(isLastStep ? 'Finish' : 'Continue');

        const handleClick = handleSubmit(onSubmit);

        mainButton.on('click', handleClick);

        return () => {
            mainButton.off('click', handleClick);
            mainButton.hide(); // Скрыть кнопку при размонтировании компонента
        };
    }, [mainButton, handleSubmit]);

    useEffect(() => {
        backButton.show()
        backButton.on('click', onBack);

        if (isFirstStep) backButton.hide()

        return () => {
            backButton.off('click', onBack);
            backButton.hide();
        };
    }, [backButton]);

    function updateFields(fields: Partial<FormData>) {
        setData(prev => {
            return { ...prev, ...fields }
        })
    }

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

    return (
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
    );
};
