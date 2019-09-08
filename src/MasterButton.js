import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

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
            right: 16,
            marginBottom: "env(safe-area-inset-bottom)",
            zIndex: 1200,
        },
        fabBack: {
            position: 'fixed',
            bottom: 24,
            right: 80,
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
    const { eventSource, reconnect } = useContext(DataContext);
    
    function callMaster() {
        if (masterButtonState==='Home') {
            goHome()
        } 
        if (masterButtonState==='System') {
            applyLayoutCard('SystemLayout')
        } 
    }

    return (
        eventSource.readyState !== 1 ?
            <Fab className={classes.fab} color="primary" onClick={ ()=> reconnect() } >
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
