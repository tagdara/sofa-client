import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './DataContext/withLayout';

import Loadable from 'react-loadable';
import Grid from '@material-ui/core/Grid';
import ErrorCard from './ErrorCard';
import ErrorBoundary from './ErrorBoundary';
import PlaceholderCard from './PlaceholderCard';
import SofaPage from './SofaPage';
import BottomNav from './BottomNav';
import BottomButtons from './BottomButtons';

const useStyles = makeStyles({
    
    controlArea: {
        margin: "8 auto",
        maxWidth: 1440,
        boxSizing: "border-box",
        overflowY: "auto",
        width: "100%",
    },
    mobileControlArea: {
        margin: "8 auto",
        maxWidth: 600,
        width: "100%",
        marginTop: "env(safe-area-inset-top)",
        paddingTop: 8,
        boxSizing: "border-box",
        overflowY: "auto",
        minHeight: "100%",
        alignContent: "flex-start",
    },
 
});

function cardLoading(props) {
    
    if (props.error) {
        console.log(props)
        return <ErrorCard message={props.error.message} />;
    } else if (props.pastDelay) {
        return <PlaceholderCard />;
    } else {
        return null;
    }
}

function SofaAppContent(props) {
    
    const classes = useStyles();
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const [modules, setModules] = useState([]);
    const [layout, setLayout] = useState({});
    const [module, setModule] = useState(null);

    useEffect(() => {
        if (!props.layout.hasOwnProperty('pages')) {
            addModules([props.layoutName])
        }
    });
    
    function addModule(modulename) {
        
        return (Loadable( { loader: () => import('./'+modulename), loading: cardLoading, }))
    }
    
    function addModules(modulelist) {
        
        var changes=false;
        var newmodules = {}

        modulelist.map( item => {
            if (modules.hasOwnProperty(item)) {
                newmodules[item]=modules[item]
            } else {
                newmodules[item]=addModule(item)
                changes=true
            }
        })
        if (changes) {
            setModules(newmodules);
        }
    }

    function renderModule( modulename, moduleprops ) {

        if (modules.hasOwnProperty(modulename)) {
            let Module = modules[modulename]
            return <Module key={ modulename } {...moduleprops} />
        } else {
            return null
        }
    }
    
    return (
        <Grid container spacing={8} className={ isMobile ? classes.mobileControlArea : classes.controlArea} >
            { props.layout.type=='pages' ? 
                <React.Fragment>
                    { props.layout.order.map( page => {
                        return (page==props.layoutPage || !isMobile ) ?
                        <SofaPage key={page} name={page} page={props.layout.pages[page]} />
                        : null
                    })}
                { isMobile && <BottomNav toggleSidebar={props.toggleSidebar} closeSidebar={props.closeSidebar}/> }
                </React.Fragment>
            : null }
            { props.layout.type=='single' ?
                <React.Fragment>
    				<ErrorBoundary wide={props.wide}>
    				{ renderModule(props.layoutName, props.layoutProps) }
                    </ErrorBoundary>
                    { (props.layoutProps && props.layoutProps.noBottom ) ? null : <BottomButtons /> }
                </React.Fragment>
			: null }
        </Grid>
    );
}

export default memo(withLayout(SofaAppContent))
