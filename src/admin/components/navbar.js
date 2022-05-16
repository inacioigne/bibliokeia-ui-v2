import {
  Zoom,
  Box,
  CssBaseline,
  AppBar,
  IconButton,
  Typography,
  FormControlLabel,
  Switch,
  Toolbar,
  Fab,
  useScrollTrigger

} from "@mui/material";
import {
    Home, 
    KeyboardArrowUp
} from "@mui/icons-material";
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from 'src/auth/authContext'

function ScrollTop(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Navbar(props) {
  const { user, signOut } = useContext(AuthContext);
  //console.log('NB: ', user.sub.name)

  async function handleSignOut(ctx) {
    await signOut(ctx);
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar id="back-to-top-anchor">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Home />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BiblioKeia
            </Typography>
            <p>{user?.sub.name}</p>

            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  color="secondary"
                  onClick={handleSignOut}
                />
              }
              label="SAIR"
            />
          </Toolbar>
        </AppBar>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
      </Box>
    </>
  );
}
