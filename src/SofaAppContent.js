import React, { useContext, useState, useEffect } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { NetworkContext } from './NetworkProvider';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import SofaPage from './SofaPage';
import SofaSinglePage from './SofaSinglePage';
import SofaLogin from './SofaLogin'

import ErrorCard from './ErrorCard'
import BottomBar from './BottomBar';
import ErrorBoundary from './ErrorBoundary';
import ReconnectButton from './ReconnectButton';
import SofaDrawer from './SofaDrawer';
import RightDrawer from './RightDrawer';
import TopBar from './TopBar';

const useStyles = makeStyles(theme => {
    
    return {
        controlArea: {
            margin: "8px auto",
            maxWidth: 1920,
            width: "100vw",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            position: "relative",
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
            paddingBottom: 0,
            marginBottom: 0,
            overflowY: "auto",
            overflowX: "hidden",
            marginLeft: "calc(100vw - 100%)",
            alignContent: "flex-start",
            flexDirection: "column",
            backgroundColor: theme.palette.layer.body,
        },
        innerDrawer: {
            display: "flex",
            maxWidth: 400,
            //minHeight: "100%",
            margin: "8px auto",
            width: "100%",
            marginTop: "env(safe-area-inset-top)",
            marginBottom: "env(safe-area-inset-top)",
            boxSizing: "border-box",
            alignContent: "flex-start",
            position: "relative",
        },
        drawerInset: {
            width:400,
        }
    }
});

export default function SofaAppContent(props) {
    
    const { layout, isMobile, renderSuspenseModule, toggleDrawer } = useContext(LayoutContext);
    const { streamConnected, connectError, loggedIn } = useContext(NetworkContext);
    const [ barSelection, setBarSelection] = useState(undefined)
    const classes = useStyles();
    

    useEffect(() => { 
        if (layout && layout.hasOwnProperty('page')) {
            setBarSelection(layout.page)
        }
    }, [layout] )

    function chooseDisplayPages() {
        
        if (!layout || !layout.data || !layout.data.type ) { return null }
        if (layout.data.type==='single') {
            return  <SofaSinglePage isMobile={ isMobile }>
                        { renderSuspenseModule(layout.name, layout.props) }
                    </SofaSinglePage>
        }
        
        if (layout.data.type==='pages') {
            if ( isMobile || layout.page) {
                if (!layout.hasOwnProperty('page') || layout.page==="") {
                    return <SofaPage wide={true} isMobile={isMobile} key={layout.data.order[0]} name={layout.data.order[0]} page={layout.data.pages[layout.data.order[0]]} />
                }
                // If we are on mobile or a specific page is selected, show that page
                return <SofaPage isMobile={isMobile} wide={ layout.data.pages[layout.page].wide } key={layout.page} name={layout.page} page={layout.data.pages[layout.page]} />
            }
            
            var pages=[]
            for (var i = 0; i < layout.data.order.length; i++) {
                var pagename=layout.data.order[i]
                pages.push(<SofaPage isMobile={isMobile}  key={ pagename } name={ pagename } page={layout.data.pages[pagename]} />)
            }
            return pages
        }
        return null
    }
    
    return (
        (loggedIn && layout) ?
        <>
            { !isMobile && <RightDrawer /> }
            { !isMobile && <TopBar section={barSelection} chooseSection={setBarSelection} toggleDrawer={toggleDrawer} /> }
            { !isMobile && <SofaDrawer /> }
            <div className={classes.scrollHolder}>
            <Grid container spacing={ isMobile && layout.data.type==='single' ? 2: 8} className={ isMobile ? classes.mobileControlArea : classes.controlArea} >
                { !streamConnected() && <ReconnectButton /> }
                <ErrorBoundary wide={props.wide}>
                { chooseDisplayPages() }
                </ErrorBoundary>
            </Grid>
            </div>
            { isMobile && <BottomBar section={barSelection} chooseSection={setBarSelection} /> }
        </>
        :
        <>
            { connectError &&
                <ErrorCard />
            }
            <Grid container spacing={2} justify="center" alignItems="center" className={ isMobile ? classes.mobileControlArea : classes.controlArea} >
                <SofaLogin />
            </Grid>
        </>
    );
}
