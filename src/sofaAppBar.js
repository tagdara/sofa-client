import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './DataContext/withLayout';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import CompareIcon from '@material-ui/icons/Compare';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
        
    list: {
        minWidth: 320,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    phoneTop: {
        paddingTop: "env(safe-area-inset-top)",
    },
    miniTop: {
        paddingTop: "env(safe-area-inset-top)",
        height: 2,
    }
}); 

function SofaAppBar(props) {
    
    const classes = useStyles();

    return (
            <AppBar className={props.mobile ? classes.miniTop: classes.phoneTop}>
                { props.mobile ?
                <div></div>
                :
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={ ()=> props.open() }>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.flex}>
                        Home
                    </Typography>
                    { props.layoutName!='Home' &&
                    <IconButton color="inherit" aria-label="Home" onClick={ ()=> props.setLayout('Home') }>
                        <HomeIcon />
                    </IconButton>
                    }
                    { props.backName &&
                    <IconButton color="inherit" aria-label="Home" onClick={ ()=>  props.goBack() }>
                        <ArrowBackIcon />
                    </IconButton>
                    }
                </Toolbar>
                }
            </AppBar>
    );
}


export default withLayout(SofaAppBar)
