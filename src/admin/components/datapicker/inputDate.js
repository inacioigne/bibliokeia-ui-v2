import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";

export default function InputDate() {
    const [value, setValue] = useState(new Date());

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
          label="Invert the order of views"
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        </LocalizationProvider>

    )
}