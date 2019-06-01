import React, { Component, createElement, memo  } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withHeartbeat } from './DataContext/withData';

import Grid from '@material-ui/core/Grid';
import ErrorCard from './ErrorCard';
import PlaceholderCard from './PlaceholderCard';
import ErrorBoundary from './ErrorBoundary';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => {
    return {
        gridColumn: {
            margin: 1,
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            padding: "3 !important",
            backgroundColor: theme.palette.background.page,
            borderRadius: "4px 4px 4px 4px",
            maxWidth: "33%",
        },
        mobileGridColumn: {
            margin: 1,
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            padding: "3px !important",
            backgroundColor: theme.palette.background.page,
            borderRadius: "4px 4px 4px 4px",
        },
        paddedToolbar: {
            paddingBottom: "env(safe-area-inset-bottom)",
            marginBottom: "env(safe-area-inset-bottom)",
        }
    }
});

function cardLoading(props) {
    
    if (props.error) {
        console.log(props)
        return <ErrorCard />;
    } else if (props.pastDelay) {
        return <PlaceholderCard />;
    } else {
        return <ErrorCard />;
    }
}

function SofaPage(props) {
    
    const classes = useStyles();
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const [modules, setModules] = useState([]);
    const [layout, setLayout] = useState({});

    useEffect(() => {
        //props.getLastUpdate()
        if (props.timedOut()) { props.refreshData() }
        if (props.page) {
            addPageModules(props.page)
        }
    },[]);

    function addModules(modulelist) {
        
        var changes=false;
        var newmodules = {}

        modulelist.map( item => {
            if (!modules.hasOwnProperty(item)) {
                console.log('Loading module',item)
                newmodules[item]= React.lazy( () => import('./'+item) )
                changes=true
            }
        })
        if (changes) {
            setModules({...modules, ...newmodules});
        }
    }

    function addPageModules(layout) {
        
        var newmodules = []
            layout.map( item => 
                newmodules.push(item['module'])
            );
        addModules(newmodules)
    }

    
    function renderSuspenseLayoutModule( item, page, index ) {
        
        if (modules.hasOwnProperty(item['module'])) {
            let Module = modules[item['module']]
            item['props']['wide']=true
            let moduleprops=item['props']
            return  <React.Suspense fallback={<PlaceholderCard name={ item['module'] }/>}>
                        <Module key={ item['module'] } {...item['props']} />
                    </React.Suspense>
        } else {
            return null
        }
    }

    return (
        <Grid container item spacing={1} key={props.name} xs={ isMobile ? 12 : 4 } className={ isMobile? classes.mobileGridColumn : classes.gridColumn}>
            <ListItem>
                <ListItemText primary={props.name} />
            </ListItem>
            { props.page.map( (item, i) => 
				<ErrorBoundary wide={true} key={props.name+i} >
					{ renderSuspenseLayoutModule(item, props.name, i) }
				</ErrorBoundary>
            )}
            {isMobile &&
                <Toolbar className={classes.paddedToolbar}/>
            }
        </Grid>
    );
}

export default withHeartbeat(SofaPage)
