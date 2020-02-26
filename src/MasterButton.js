import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import { NetworkContext } from './NetworkProvider';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RefreshIcon from '@material-ui/icons/Refresh';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => {
    return {
            
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
        desktopTop: {
            paddingTop: "env(safe-area-inset-top)",
        },
        phoneTop: {
            paddingTop: "env(safe-area-inset-top)",
            height: 2,
        },
        fab: {
            position: "fixed",
            bottom: 16,
            left: "calc(100vw - 80px)",
            marginBottom: "env(safe-area-inset-bottom)",
            zIndex: 1200,
        },
        fabBack: {
            position: 'fixed',
            bottom: 24,
            left: "calc(100vw - 128px)",
            padding: 0,
            marginBottom: "env(safe-area-inset-bottom)",
            boxSizing: "content-box",
            zIndex: 1200,
        },   
    }
}); 

export default function MasterButton(props) {
    
    const classes = useStyles();
    const { applyLayoutCard, masterButtonState, goBack, goHome, backPage } = useContext(LayoutContext);
    const { loggedIn, connectError } = useContext(NetworkContext);
    
    function callMaster() {
        if (masterButtonState==='Home') {
            goHome()
        } 
        if (masterButtonState==='System') {
            applyLayoutCard('SystemLayout')
        } 
    }
    
    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    }
    
    return (
        loggedIn===false || connectError ?
            <Fab className={classes.fab} color="primary" onClick={ ()=> reloadPWA() } >
                <RefreshIcon />
            </Fab>
        :
            <>
                <Fab className={classes.fab} color="primary" onClick={ ()=> callMaster() } >
                    { masterButtonState==='System' && <MenuIcon /> }
                    { masterButtonState==='Home' && <HomeIcon /> }
                </Fab>
                { backPage.name &&
                    <Fab size="small" color="primary" onClick={ ()=>  goBack() } className={classes.fabBack} >
                        <ArrowBackIcon />
                    </Fab>
                }
            </>
    );
}
