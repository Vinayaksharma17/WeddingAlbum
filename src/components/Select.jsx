import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({onSelectCategory}) {
  const [photos, setPhotos] = React.useState('');

  const names = [
    'All',
    'Pre-Wedding Photos',
    'Engagement Photos',
    'Wedding Ceremony Photos',
    'Reception Photos',
    'Family and Group Photos',
    'Candid or Documentary Style',  
  ]

  const handleChange = (event) => {
    setPhotos(event.target.value)
    onSelectCategory(event.target.value)
    // console.log(onSelectCategory);
  };

  return (
    <Box sx={{ minWidth: 180, marginY: 1.5}} >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Photos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={photos}
          label="Select Photos"
          onChange={handleChange}
        >
          {names.map((name) => (
            <MenuItem value={name} key={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}