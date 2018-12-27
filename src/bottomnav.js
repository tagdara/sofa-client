import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './DataContext/withLayout';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import MenuIcon from '@material-ui/icons/Menu';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SettingsIcon from '@material-ui/icons/Settings';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import HomeIcon from '@material-ui/icons/Home';
import Fab from '@material-ui/core/Fab';

// Z Index for dialogs is 1300, so this needs to be lower than that, but still very high to avoid glitches with switches showing through

const useStyles = makeStyles({

    root: {
        position: 'fixed',
        bottom: 0,
        padding: 0,
        paddingBottom: "env(safe-area-inset-bottom)",
        boxSizing: "content-box",
        minWidth: 320,
        width: '100%',
        zIndex: 1200,
    },
    fabRoot: {
        position: 'fixed',
        bottom: 8,
        right: 32,
        padding: 0,
        marginBottom: "env(safe-area-inset-bottom)",
        boxSizing: "content-box",
        zIndex: 1200,
    },

});

function BottomNav(props) {

    const classes = useStyles();
    
    useEffect( () => {
        if (props.layoutPage=="") {
            props.setLayoutPage("Audio Video")
        }
    }, [])

    function handleChange(event, value) {
        console.log(value)
        if (value=="Menu") {
            props.toggleSidebar()
        } else if (value=="Home") {
            props.setLayout('Home');
        } else {
            props.closeSidebar()
            props.setLayoutPage(value);
        }
    };

    return (
        <React.Fragment>
            { props.layoutName!="Home" ? 
            <Fab color="primary" onClick={ (e)=> handleChange(e,'Home') } className={classes.fabRoot} >
                <HomeIcon />
            </Fab>
            :
            <BottomNavigation value={props.layoutPage} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction value="Menu" icon={<MenuIcon />} />
                <BottomNavigationAction value="Audio Video" icon={<SubscriptionsIcon />} />
                <BottomNavigationAction value="Lights" icon={<LightbulbOutlineIcon size={24} />} />
                <BottomNavigationAction value="Security" icon={<VerifiedUserIcon />} />
            </BottomNavigation>
            }
        </React.Fragment>
    )
}


export default withLayout(BottomNav);
