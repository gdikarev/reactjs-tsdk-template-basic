import {
    Box, TextField, FormLabel, FormControl,
    FormControlLabel, RadioGroup, Radio
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from "dayjs";

import {useFormContext} from "react-hook-form";

import {UserDataProps} from "@/shared/type/userRegistrationData.ts";

export function UserData({name, email, birthday, gender, updateFields} : UserDataProps) {
    const { register } = useFormContext();

    return (
        <Box display="flex" flexDirection="column" width="90vh" height="100vh" padding={2}>
            <FormControl fullWidth>
                <TextField
                    id="name"
                    label="Name"
                    variant="standard"
                    value={name}
                    fullWidth
                    margin="normal"
                    {...register('name')}
                    onChange={e => updateFields({ name: e.target.value })}
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    type="email"
                    id="email"
                    label="Email"
                    variant="standard"
                    value={email}
                    fullWidth
                    margin="normal"
                    {...register('email')}
                    onChange={e => updateFields({ email: e.target.value })}
                />
            </FormControl>
            <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box marginY={2}>
                        <DatePicker
                            label="Date of birth"
                            defaultValue={birthday ? dayjs(birthday) : null}
                            onChange={newValue => updateFields({ birthday: newValue?.format('YYYY-MM-DD') || '' })}
                            // renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Box>
                </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth>
                <FormLabel id="gender-label">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="gender-label"
                    name="gender"
                    value={gender}
                    onChange={e => updateFields({ gender: e.target.value })}
                >
                    <FormControlLabel value="f" control={<Radio /> } label="Female" {...register('gender')} />
                    <FormControlLabel value="m" control={<Radio />} label="Male" {...register('gender')} />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}
