import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { NetworkContext } from './NetworkProvider';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import ErrorBoundary from './ErrorBoundary';
import PlaceholderCard from './PlaceholderCard';
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
    
    const { layout, layouts, isMobile } = useContext(LayoutContext);
    const { connectError, streamError, loggedIn } = useContext(NetworkContext);
    const classes = useStyles();
    const [modules, setModules] = useState([]);
    
    useEffect(() => {

        function addSuspenseModule(modulename) {
            return ( React.lazy(() => import('./'+modulename)))
        }

        function addModules(modulelist) {
            var newmodules = {}
            modulelist.forEach( item => {
                console.log('adding module',item)
                newmodules[item]=addSuspenseModule(item)
            })
            setModules(newmodules);
        }
        console.log('layout', layout)
        console.log('layouts', layouts)
        
        if (loggedIn) {
            if (layouts===undefined) {
                console.log('layouts not ready')
            } else if (layout && layout.hasOwnProperty('error')) {
                console.log('Layout not ready', layout.error)
            } else if (layout && isMobile) {
                if (layouts && layouts.hasOwnProperty(layout.name) && layouts[layout.name].hasOwnProperty('mobile')) {
                    addModules([layouts[layout.name]['mobile']])
                } else {
                    addModules([layout.name])
                }
            } else if (layout && layouts && layouts.hasOwnProperty(layout.name) && !layouts[layout.name].hasOwnProperty('pages')) {
                addModules([layout.name])
            } else {
                addModules([layout.name])
            }
        }
        
    },[ layout, layouts, isMobile, loggedIn ]);
    
    function renderSuspenseModule( modulename, moduleprops ) {

        if (modules.hasOwnProperty(modulename)) {
            let Module = modules[modulename]
            return <React.Suspense fallback={<PlaceholderCard />}>
                        <Module key={ modulename } {...moduleprops} />
                    </React.Suspense>
        } else {
            return null
        }
    }
 

    return (
        loggedIn ?
            <Grid container spacing={ isMobile && layout.data.type==='single' ? 2: 8} className={ isMobile ? classes.mobileControlArea : classes.controlArea} >
                { layout.data.type==='pages'  && 
                    <ErrorBoundary wide={props.wide}>
                        { layout.data.order.map( page => {
                            return (page===layout.page || !isMobile ) ?
                            <SofaPage key={page} name={page} page={layout.data.pages[page]} />
                            : null
                        })}
                    </ErrorBoundary>
                }
                { layout.data.type==='single' ?
                    <React.Fragment>
        				<ErrorBoundary wide={props.wide}>
        				{ renderSuspenseModule(layout.name, layout.props) }
                        </ErrorBoundary>
                    </React.Fragment>
    			: null }
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
