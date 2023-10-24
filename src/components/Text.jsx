import * as React from 'react';
import Typography from '@mui/material/Typography';

function MyCursiveText({ filteredImages }) {
  return (
    <>
    {filteredImages.length === 0 ? (
      <></>
    ) : (
      <Typography variant="h1" sx={{ fontFamily: "Tangerine, cursive" }}>
        Vaishnavi with Narasimha
      </Typography>
    )}
  </>
)}

export default MyCursiveText;
