import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from "dayjs";

import {
    Box, TextField, FormLabel, FormControl,
    FormControlLabel, RadioGroup, Radio
} from '@mui/material';

type UserData = {
    name: string,
    email: string,
    birthday: string,
    gender: string,
}

type UserDataProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

export function UserData({name, email, birthday, gender, updateFields} : UserDataProps) {
    return (
        <Box display="flex" flexDirection="column" width="90vh" height="100vh" padding={2}>
            <FormControl fullWidth>
                <TextField
                    id="name"
                    label="Name"
                    variant="standard"
                    defaultValue={name}
                    onChange={e => updateFields({ name: e.target.value })}
                    fullWidth
                    margin="normal"
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    type="email"
                    id="email"
                    label="Email"
                    variant="standard"
                    defaultValue={email}
                    onChange={e => updateFields({ email: e.target.value })}
                    fullWidth
                    margin="normal"
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
                    <FormControlLabel value="f" control={<Radio />} label="Female" />
                    <FormControlLabel value="m" control={<Radio />} label="Male" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}
