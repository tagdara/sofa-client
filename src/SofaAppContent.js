import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './layout/NewLayoutProvider';

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
    const [modules, setModules] = useState([]);
    const [module, setModule] = useState(null);

    useEffect(() => {
        if (!props.layout.data.hasOwnProperty('pages')) {
            addModules([props.layout.name])
        }
    },[props.layout]);
    

    function addSuspenseModule(modulename) {
        
        return ( React.lazy(() => import('./'+modulename)))
    }

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
    
    function addModules(modulelist) {
        
        var changes=false;
        var newmodules = {}
        modulelist.map( item => {
            if (modules.hasOwnProperty(item)) {
                newmodules[item]=modules[item]
            } else {
                console.log('adding module',item)
                //newmodules[item]=addModule(item)
                newmodules[item]=addSuspenseModule(item)
                changes=true
            }
        })
        if (changes) {
            setModules(newmodules);
        }
    }

    return (
        <Grid container spacing={ props.isMobile && props.layout.data.type=='single' ? 2: 8} className={ props.isMobile ? classes.mobileControlArea : classes.controlArea} >
            { props.layout.data.type=='pages'  && 
                <React.Fragment>
                    { props.layout.data.order.map( page => {
                        return (page==props.layout.page || !props.isMobile ) ?
                        <SofaPage key={page} name={page} page={props.layout.data.pages[page]} />
                        : null
                    })}
                </React.Fragment>
            }
            { props.layout.data.type=='single' ?
                <React.Fragment>
    				<ErrorBoundary wide={props.wide}>
    				{ renderSuspenseModule(props.layout.name, props.layout.props) }
                    </ErrorBoundary>
                </React.Fragment>
			: null }
        </Grid>
    );
}

export default withLayout(SofaAppContent)
