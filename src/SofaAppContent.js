import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import ErrorBoundary from './ErrorBoundary';
import PlaceholderCard from './PlaceholderCard';
import SofaPage from './SofaPage';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

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
    
    const { layout, isMobile } = useContext(LayoutContext);
    const { eventSource } = useContext(DataContext);
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

        if (!layout.data.hasOwnProperty('pages')) {
            addModules([layout.name])
        }
    },[layout]);
    
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
        eventSource.readyState !== 1 ?
        <Grid container spacing={2} className={ isMobile ? classes.mobileControlArea : classes.controlArea} >
            <ListItem>
                <ListItemText primary="Network not ready" secondary={"Server side status "+eventSource.readyState} />
            </ListItem>
        </Grid>
        :
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
			<Typography className={ classes.version } variant="caption">{process.env.REACT_APP_VERSION}</Typography>
        </Grid>
    );
}
