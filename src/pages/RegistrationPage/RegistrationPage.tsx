import {UserData} from "@/components/RegistrationPage/UserData.tsx";
import {UserPhotos} from "@/components/RegistrationPage/UserPhotos.tsx";
import {UserPreferences} from "@/components/RegistrationPage/UserPreferences.tsx";
import {useMultistepForm} from "@/hooks/useMultistepForm.tsx";
import {FileData} from "@/shared/interface/registration.ts";

import {FC, FormEvent, useState} from 'react';
import { Box, Container, Button } from '@mui/material';

import {retrieveLaunchParams} from '@telegram-apps/sdk';

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

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        if (!isLastStep) return next()
        alert(JSON.stringify(data))
    }

    return (
        <form onSubmit={onSubmit}
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
            <Box position="fixed" bottom={20} left={0} right={0} padding={2}>
                <Container maxWidth="xs">
                    <Box display="flex" justifyContent="space-between">
                        <Button variant="text" onClick={back} fullWidth>
                            Back
                        </Button>
                        <Button variant="contained" type="submit" fullWidth>
                            {isLastStep ? "Finish" : "Continue"}
                        </Button>
                    </Box>
                </Container>
            </Box>
        </form>
    );
};
