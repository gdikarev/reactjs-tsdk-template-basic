import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

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
        <Box display="flex" flexDirection="column" width="100%" height="100%" padding={2}>
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
                            defaultValue={dayjs(birthday)}
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
