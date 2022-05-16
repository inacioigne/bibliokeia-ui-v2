import { Controller } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material/";

export default function Indicators(props) {
    if (props.metadata) {
        return (
            <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.metadata.defaultValue}
        render={({ field }) => (
          <TextField
          
          select
            {...field}
            label={props.label}
            variant="outlined"
            size="small"
            sx={{ width: 75 }}
          >
              {props.metadata.options.map((options) => (
                <MenuItem key={options.value} value={options.value}>
                {options.label}
              </MenuItem>
              ))}
          </TextField>
        )}
      />
        )
    } else {
        return (
            <Controller
          name={props.name}
          control={props.control}
          defaultValue="#"
          render={({ field }) => (
            <TextField
              {...field}
              label={props.label}
              variant="outlined"
              size="small"
              sx={{ width: 75 }}
              InputProps={{
            readOnly: true,
          }}
            />
          )}
        />
        )
    }
}