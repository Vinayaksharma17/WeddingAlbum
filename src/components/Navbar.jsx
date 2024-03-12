import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import jiju_ok from '../assets/jiju_ok.JPG'

const useStyles = {
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
};

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function ScrollTop(props) {
  const { window } = props;

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div onClick={handleClick} role="presentation" style={useStyles.fab}>
      <Fab color="primary" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </div>
  );
}

export default function Navbar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                alt="Cindy Baker"
                src={"https://img.freepik.com/premium-vector/cute-little-girl-measure-length-using-foot-step_97632-6172.jpg?w=740"}
              />
              <Avatar
                alt="Another Avatar"
                src="https://img.freepik.com/premium-vector/cartoon-little-boy-summer-clothing-waving-hand_353337-444.jpg?w=360"
              />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      {props.children}
      <ScrollTop {...props} />
    </React.Fragment>
  );
}
