import * as React from 'react';
import Typography from '@mui/material/Typography';

function MyCursiveText({ filteredImages }) {
  return (
    <>
    {filteredImages.length === 0 ? (
      <></>
    ) : (
      <Typography variant="h1" sx={{ fontFamily: "Tangerine, cursive" }}>
       Narasimha with Vaishnavi  
      </Typography>
    )
    }
     <Typography variant="h3" sx={{ fontFamily: "Tangerine, cursive" }}>
       We wellcome you to our photo gallery
      </Typography>
  </>
)}

export default MyCursiveText;
