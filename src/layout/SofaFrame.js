import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';

import { Scrollbars } from 'react-custom-scrollbars';
import BottomBar from 'layout/BottomBar';
import ReconnectButton from 'network/ReconnectButton';
import SofaDrawer from 'layout/SofaDrawer';
import RightDrawer from 'layout/RightDrawer';
import TopBar from 'layout/TopBar';
import useStream from 'store/useStream'
import storeUpdater from 'store/storeUpdater'
import useLayoutStore from 'store/layoutStore'
import useUserStore from 'store/userStore'

import { discovery, refreshDirectives } from 'store/directive'
import { addModule, renderSuspenseModule } from 'store/layoutHelpers'

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
            boxSizing: "border-box",
            alignContent: "flex-start",
            display: "flex",
            position: "relative",
            paddingBottom: 64,
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
            //backgroundColor: theme.palette.layer.body,
        },
    }
});

export default function SofaFrame(props) {
    
    const { streamConnected } = useStream(storeUpdater)
    const currentPage = useLayoutStore(state => state.currentPage)
    const currentProps = useLayoutStore(state => state.currentProps)
    const maxScreenWidth = useLayoutStore(state => state.maxScreenWidth)
    const isMobile = useLayoutStore(state => state.isMobile)
    const refreshUser = useUserStore(state => state.refresh)
    const classes = useStyles(maxScreenWidth);
    
    useEffect(() => {
        refreshDirectives()
        discovery()
        refreshUser()
        // eslint-disable-next-line 
    }, [])

    useEffect(() => { 
        if (currentPage) {
            addModule(currentPage)
        }
    // eslint-disable-next-line 
    }, [ currentPage ] )

    return (
        <>
            { !isMobile && <RightDrawer /> }
            { !isMobile && <TopBar /> }
            { !isMobile && <SofaDrawer /> }
            <Scrollbars>
            <div className={classes.scrollHolder}>
                { !streamConnected && <ReconnectButton /> }
                <Grid container spacing={ 1 } className={ isMobile ? classes.mobileControlArea : classes.controlArea} >
                    { renderSuspenseModule(currentPage, currentProps) }
                </Grid>
            </div>
            </Scrollbars>
            { isMobile && <BottomBar /> }
        </>
    );
}
