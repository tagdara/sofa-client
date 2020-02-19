import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { NetworkContext } from './NetworkProvider';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import ErrorBoundary from './ErrorBoundary';
import SofaPage from './SofaPage';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SofaLogin from './SofaLogin'
import ErrorCard from './ErrorCard'


const useStyles = makeStyles({
    
    controlArea: {
        margin: "8px auto",
        maxWidth: 1440,
        boxSizing: "border-box",
        overflowY: "auto",
        width: "100%",
    },
    mobileControlArea: {
        margin: "8px auto",
        maxWidth: 600,
        width: "100%",
        marginTop: "env(safe-area-inset-top)",
        paddingTop: 8,
        boxSizing: "border-box",
        overflowY: "auto",
        minHeight: "100%",
        alignContent: "flex-start",
    },
    version: {
        paddingLeft: 16,
        opacity: "0.5"
    }
});

export default function SofaAppContent(props) {
    
    const { layout, isMobile, renderSuspenseModule } = useContext(LayoutContext);
    const { connectError, streamError, loggedIn } = useContext(NetworkContext);
    const classes = useStyles();

    return (
        loggedIn ?
            <Grid container spacing={ isMobile && layout.data.type==='single' ? 2: 8} className={ isMobile ? classes.mobileControlArea : classes.controlArea} >
                { (layout.data.type==='pages' && ( !isMobile || layout.page || layout.data.mobile===undefined)) &&
                    <ErrorBoundary wide={props.wide}>
                        { layout.data.order.map( page => {
                            return (layout.page===undefined || page===layout.page || !isMobile ) ?
                            <SofaPage key={page} name={page} page={layout.data.pages[page]} />
                            : null
                        })}
                    </ErrorBoundary>
                }
                { layout.data.type==='single' &&
    				<ErrorBoundary wide={props.wide}>
    				{ renderSuspenseModule(layout.name, layout.props) }
                    </ErrorBoundary>
                }
                { layout.data.type==='pages' && (isMobile && layout.data.mobile!==undefined) &&
    				<ErrorBoundary wide={props.wide}>
    				{ renderSuspenseModule(layout.page ? layout.page : layout.data.mobile, layout.props) }
                    </ErrorBoundary>
                }
                { (streamError || connectError) && 
                    <Grid container spacing={2} className={ isMobile ? classes.mobileControlArea : classes.controlArea} >
                        <ListItem>
                            <ListItemText primary="Network not ready" secondary={streamError ? "Server Side Event Stream not connected" : null } />
                        </ListItem>
                    </Grid>
                }
                <Typography className={ classes.version } variant="caption">{process.env.REACT_APP_VERSION}</Typography>
            </Grid>
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
