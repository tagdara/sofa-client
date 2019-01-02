import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './DataContext/withLayout';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import Loadable from 'react-loadable';

import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import MenuIcon from '@material-ui/icons/Menu';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SettingsIcon from '@material-ui/icons/Settings';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import HomeIcon from '@material-ui/icons/Home';
import LensIcon from '@material-ui/icons/Lens';
import ClearIcon from '@material-ui/icons/Clear';

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

function iconLoading(props) {
    
    if (props.error) {
        console.log(props)
        return <ClearIcon />;
    } else if (props.pastDelay) {
        return <LensIcon />;
    } else {
        return null;
    }
}

function BottomNav(props) {

    const classes = useStyles();
    const [modules, setModules] = useState([]);
   
    useEffect( () => {
        if (props.layout.hasOwnProperty('pages')) {
            addIcons(props.layout.icons)
            console.log('layoutpage',props.layoutPage)
            if (props.layoutPage=="" && props.layout.pages) {
                console.log('no page, setting to', Object.keys(props.layout.pages)[0])
                props.setLayoutPage(Object.keys(props.layout.pages)[0])
            }
        }
    })

    function addModule(modulename) {
        console.log('Adding module', modulename)
        return (Loadable( {
            loader: () => import(modulename), // Here can be any component!
            loading: iconLoading, }))
    }

    function addIcons(modulelist) {
        
        var changes=false;
        var newmodules = {}

        Object.keys(modulelist).map( item => {
            var icon=modulelist[item]
            if (modules.hasOwnProperty(icon)) {
                newmodules[icon]=modules[icon]
            } else {
                newmodules[icon]=addModule(icon)
                changes=true
            }
        })
        if (changes) {
            setModules(newmodules);
        }
    }
    
    function renderModule( modulename, moduleprops ) {
        
        if (modules.hasOwnProperty(modulename)) {
            console.log('loading icon', modulename)
            let Module = modules[modulename]
            return <Module key={ modulename } {...moduleprops} />
        } else {
            console.log('Did not find',modulename,'in',modules)
            return <LensIcon />
        }
    }
    
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
            { props.layoutName!="Home" || !props.layout.pages ? 
            <Fab color="primary" onClick={ (e)=> handleChange(e,'Home') } className={classes.fabRoot} >
                <HomeIcon />
            </Fab>
            :
            <BottomNavigation value={props.layoutPage} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction value="Menu" icon={<MenuIcon />} />
                { Object.keys(props.layout.pages).map( page => 
                    <BottomNavigationAction key={page+'bn'} value={page} icon={renderModule(props.layout.icons[page])} />
                )}
            </BottomNavigation>
            }
        </React.Fragment>
    )
}


export default withLayout(BottomNav);
