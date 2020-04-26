import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { NetworkContext } from './NetworkProvider';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import SofaPage from './SofaPage';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SofaLogin from './SofaLogin'
import ErrorCard from './ErrorCard'
import BottomBar from './BottomBar';


const useStyles = makeStyles(theme => {
    
    return {
        controlArea: {
            margin: "8px auto",
            maxWidth: 1920,
            width: "100vw",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
        },
        mobileControlArea: {
            minHeight: "100%",
            margin: "8px auto",
            maxWidth: 600,
            width: "100%",
            marginTop: "env(safe-area-inset-top)",
            marginBottom: "env(safe-area-inset-top)",
            boxSizing: "border-box",
            alignContent: "flex-start",
            display: "flex",
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
            marginLeft: "calc(100vw - 100%)",
            alignContent: "flex-start",
            flexDirection: "column",
            minWidth: "100%",
            backgroundColor: theme.palette.layer.body,
        }
    }
});

export default function SofaAppContent(props) {
    
    const { layout, isMobile, renderSuspenseModule } = useContext(LayoutContext);
    const { streamStatus, streamConnected, connectError, loggedIn } = useContext(NetworkContext);
    const classes = useStyles();

    function chooseDisplayPages() {
        if (layout.data.type==='single') {
            return renderSuspenseModule(layout.name, layout.props)
        }
        
        if (layout.data.type==='pages') {
            if ( isMobile || layout.page) {
                if (!layout.hasOwnProperty('page') || layout.page==="") {
                    return <SofaPage wide={true} key={layout.data.order[0]} name={layout.data.order[0]} page={layout.data.pages[layout.data.order[0]]} />
                }
                // If we are on mobile or a specific page is selected, show that page
                return <SofaPage wide={ true } key={layout.page} name={layout.page} page={layout.data.pages[layout.page]} />
            }
            
            var pages=[]
            for (var i = 0; i < layout.data.order.length; i++) {
                var pagename=layout.data.order[i]
                pages.push(<SofaPage key={ pagename } name={ pagename } page={layout.data.pages[pagename]} />)
            }
            return pages
        }
        return null
    }

    return (
        loggedIn ?
        <>
            <div className={classes.scrollHolder}>
            <Grid container spacing={ isMobile && layout.data.type==='single' ? 2: 8} className={ isMobile ? classes.mobileControlArea : classes.controlArea} >
                { chooseDisplayPages() }
                { !streamConnected && 
                    <Grid container spacing={2} className={ isMobile ? classes.mobileControlArea : classes.controlArea} >
                        <ListItem>
                            <ListItemText primary="Network not ready" secondary={"Server Side Event Stream not connected:" +streamConnected+" " +streamStatus } />
                        </ListItem>
                    </Grid>
                }
            </Grid>
            </div>
            { isMobile && <BottomBar /> }
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
