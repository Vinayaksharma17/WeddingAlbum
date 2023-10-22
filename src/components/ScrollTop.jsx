import Fab from '@mui/material/Fab';
import * as React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollTop(props) {
    const { window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
  
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Slide appear={false} direction="up" in={trigger}>
        <Fab color="secondary" size="small" onClick={handleClick} aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Slide>
    );
  }
  
  export default ScrollTop


 