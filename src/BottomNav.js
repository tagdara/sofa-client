import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './DataContext/withLayout';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';

import LightbulbOutlineIcon from './LightbulbOutline';
import MenuIcon from '@material-ui/icons/Menu';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SettingsIcon from '@material-ui/icons/Settings';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import HomeIcon from '@material-ui/icons/Home';
import LensIcon from '@material-ui/icons/Lens';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Z Index for dialogs is 1300, so this needs to be lower than that, but still very high to avoid glitches with switches showing through

const useStyles = makeStyles({

    root: {
        position: 'fixed',
        bottom: 0,
        padding: 0,
        minWidth: 320,
        paddingBottom: "env(safe-area-inset-bottom)",
        width: '100%',
        zIndex: 1200,
        margin: 0,
        boxSizing: "content-box",
        transform: "translate3d(0,0,0)"
    },
    bottomSpacer: {
        marginTop: 64,
        marginBottom: "env(safe-area-inset-bottom)",
    }

});

function iconLoading(props) {
    
    if (props.error) {
        return <ClearIcon />;
    } else if (props.pastDelay) {
        return <LensIcon />;
    } else {
        return null;
    }
}


function BottomNav(props) {

    const classes = useStyles();
    const icons = {'Audio Video':MusicVideoIcon, 'Security':VerifiedUserIcon, 'Lights':LightbulbOutlineIcon}
    
    useEffect( () => {
        if (props.layout.hasOwnProperty('pages')) {
            if (props.layoutPage=="" && props.layout.pages) {
                props.setLayoutPage(Object.keys(props.layout.pages)[0])
            }
        }
    })

    function handleChange(event, value) {

        if (value=="Menu") {
            props.toggleSidebar()
        } else if (value=="Home") {
            props.setLayout('Home');
        } else {
            props.closeSidebar()
            props.setLayoutPage(value);
        }
    };
    
    function getIcon(category, size='default') {

        if (icons.hasOwnProperty(category)) {
            var RealIcon=icons[category]
        } else {
            var RealIcon=DeveloperBoardIcon
        }
        return <RealIcon size={24} fontSize={size} />
    }
    
    return (
        <React.Fragment>
            <Toolbar className={classes.bottomSpacer} />
            <BottomNavigation value={props.layoutPage} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction value="Menu" icon={<MenuIcon />} />
                { Object.keys(props.layout.pages).map( page => 
                    <BottomNavigationAction key={page+'bn'} value={page} icon={getIcon(page)} />
                )}
            </BottomNavigation>
        </React.Fragment>
    )
}


export default withLayout(BottomNav);
