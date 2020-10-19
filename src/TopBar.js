import React, { useContext} from 'react';
import { NetworkContext } from './NetworkProvider';
import { LayoutContext } from './layout/NewLayoutProvider';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotesIcon from '@material-ui/icons/Notes';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopBar(props) {
    const classes = useStyles();
    const { loggedIn } = useContext(NetworkContext);
    const {  goBack, currentPage, goHome, toggleDrawer, toggleRightDrawer } = useContext(LayoutContext);

      return (
          <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none', borderBottom: "1px solid #222"}}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} onClick={ () => toggleDrawer() } color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Home
              </Typography>
              {loggedIn && (
                <div>
                    { currentPage!=='Stacks' && 
                        <IconButton onClick={ () => goBack() }>
                            <ArrowBackIcon /> 
                        </IconButton>
                    }
                    { currentPage!=='Stacks' && 
                        <IconButton onClick={ () => goHome() }>
                            <HomeIcon /> 
                        </IconButton>
                    }

                  <IconButton  onClick={ () => toggleRightDrawer() }>
                    <NotesIcon />
                  </IconButton>
                </div>
              )}
            </Toolbar>
          </AppBar>
      );
}