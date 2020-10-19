import React, { useContext, useEffect } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { NetworkContext } from './NetworkProvider';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import SofaLogin from './SofaLogin'

import ErrorCard from './ErrorCard'
import BottomBar from './BottomBar';
import ReconnectButton from './ReconnectButton';
import SofaDrawer from './SofaDrawer';
import RightDrawer from './RightDrawer';
import TopBar from './TopBar';
import { Scrollbars } from 'react-custom-scrollbars';


const useStyles = makeStyles(theme => {
    
    return {
        controlArea: {
            margin: "8px auto",
            maxWidth: maxScreenWidth => maxScreenWidth,
            width: "100vw",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            padding: 12,
        },
        mobileControlArea: {
            //minHeight: "100%",
            margin: "8px auto",
            maxWidth: 600,
            width: "100%",
            marginTop: "env(safe-area-inset-top)",
            marginBottom: "env(safe-area-inset-top)",
            boxSizing: "border-box",
            alignContent: "flex-start",
            display: "flex",
            position: "relative",
        },
        version: {
            paddingLeft: 16,
            opacity: "0.5"
        },
        scrollHolder: {
            display: "flex",
            flex:3,
            boxSizing: "border-box",
            //padding: "0px 20px",
            paddingBottom: 0,
            marginBottom: 0,
            overflowY: "auto",
            overflowX: "hidden",
            //marginLeft: "calc(100vw - 20px - 100%)",
            alignContent: "flex-start",
            flexDirection: "column",
            backgroundColor: theme.palette.layer.body,
        },
    }
});

export default function SofaFrame(props) {
    
    const { addModule, currentPage, currentProps, isMobile, renderSuspenseModule, maxScreenWidth } = useContext(LayoutContext);
    const { streamConnected, connectError, loggedIn } = useContext(NetworkContext);
    const classes = useStyles(maxScreenWidth);

    useEffect(() => { 
        if (currentPage) {
            addModule(currentPage)
        }
    // eslint-disable-next-line 
    }, [currentPage] )
    
    return (
        (loggedIn) ?
        <>
            { !isMobile && <RightDrawer /> }
            { !isMobile && <TopBar /> }
            { !isMobile && <SofaDrawer /> }
            <Scrollbars>

            <div className={classes.scrollHolder}>
                { !streamConnected() && <ReconnectButton /> }
                <Grid container spacing={ 1 } className={ isMobile ? classes.mobileControlArea : classes.controlArea} >
                    { renderSuspenseModule(currentPage, currentProps) }
                </Grid>
            </div>
            </Scrollbars>
            { isMobile && <BottomBar /> }
        </>
        :
        <>
            { connectError &&
                <ErrorCard />
            }
            <Grid container spacing={2} >
                <SofaLogin />
            </Grid>
        </>
    );
}
