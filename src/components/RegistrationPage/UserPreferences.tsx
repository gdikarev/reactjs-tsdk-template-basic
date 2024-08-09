import {
    Box, Slider, FormControl, FormLabel,
    FormControlLabel, RadioGroup, Radio
} from '@mui/material';
import {useFormContext} from "react-hook-form";

import {UserPreferencesProps} from "@/shared/type/userRegistrationData.ts";

export function UserPreferences({search_gender, search_age_from, search_age_to, updateFields} : UserPreferencesProps) {
    const { register } = useFormContext();

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
                    <FormControlLabel value="f" control={<Radio />} label="Female" {...register('search_gender')}/>
                    <FormControlLabel value="m" control={<Radio />} label="Male" {...register('search_gender')}/>
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
