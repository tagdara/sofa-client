import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { SofaThemeContext } from 'theme/SofaTheme';
import { ThemeProvider } from "@mui/material/styles";

import Grid from '@mui/material/Grid';
import CssBaseline from "@mui/material/CssBaseline";

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
            maxWidth: maxScreenWidth => maxScreenWidth+" !important",
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            padding: 12,
        },
        mobileControlArea: {
            //minHeight: "100%",
            margin: "8px 0 !important",
            maxWidth: 480,
            width: "100vw !important",
            marginTop: "env(safe-area-inset-top)",
            boxSizing: "border-box",
            alignContent: "flex-start",
            display: "flex",
            position: "relative",
            paddingBottom: 64,
            flexDirection: "column",
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

    const { theme } = useContext(SofaThemeContext)
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
        <ThemeProvider theme={ theme }>
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
            <CssBaseline />
        </ThemeProvider>
    );
}
