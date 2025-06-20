import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall({options,value,onChange,label}) {


  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        name={label}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label={`${label}`}
        onChange={onChange}
      >


{options.map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
))}

      </Select>
    </FormControl>
  );
}
