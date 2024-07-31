import {
    Box, Slider, FormControl, FormLabel,
    FormControlLabel, RadioGroup, Radio
} from '@mui/material';

type UserPreferences = {
    search_gender: string,
    search_age_from: number,
    search_age_to: number,
}

type UserPreferencesProps = UserPreferences & {
    updateFields: (fields: Partial<UserPreferences>) => void
}

export function UserPreferences({search_gender, search_age_from, search_age_to, updateFields} : UserPreferencesProps) {
    return (
        <Box display="flex" flexDirection="column" width="100%" height="100%" padding={2}>
            <FormControl fullWidth margin="normal">
                <FormLabel id="search-gender-label">Looking for</FormLabel>
                <RadioGroup
                    aria-labelledby="search-gender-label"
                    name="controlled-radio-buttons-group"
                    value={search_gender}
                    onChange={e => updateFields({ search_gender: e.target.value })}
                >
                    <FormControlLabel value="f" control={<Radio />} label="Female" />
                    <FormControlLabel value="m" control={<Radio />} label="Male" />
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <FormLabel id="search-age-label">Preferred match age</FormLabel>
                <Slider
                    getAriaLabel={() => 'Preferred age range'}
                    value={[search_age_from, search_age_to]}
                    onChange={(_, newValue) => {
                        if (Array.isArray(newValue)) {
                            updateFields({ search_age_from: newValue[0], search_age_to: newValue[1] });
                        }
                    }}
                    valueLabelDisplay="auto"
                    disableSwap
                    min={0}
                    max={100}
                />
            </FormControl>
        </Box>
    );
}
