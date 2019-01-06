import React, { Component, createElement  } from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Loadable from 'react-loadable';
import Grid from '@material-ui/core/Grid';
import ErrorCard from './ErrorCard';
import PlaceholderCard from './PlaceholderCard';
import ErrorBoundary from './ErrorBoundary';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles({
    
    controlArea: {
        margin: "8 auto",
        maxWidth: 1440,
        width: "100%",
        boxSizing: "border-box",
        overflowY: "auto",
        justifyContent: "center",
    },
    mobileControlArea: {
        margin: "8 auto",
        maxWidth: 600,
        width: "100%",
        paddingTop: "env(safe-area-inset-top)",
        boxSizing: "border-box",
        overflowY: "auto",
        minHeight: "100%",
    },
    gridColumn: {
        margin: 0,
        overflowX: "hidden",
        overflowY: "hidden",
        alignContent: "start",
    },
    gridItem: {
        overflowX: "hidden",
        width: "100%",
    },
    paddedToolbar: {
        paddingBottom: "env(safe-area-inset-bottom)",
    }
});

function cardLoading(props) {
    
    if (props.error) {
        console.log(props)
        return <ErrorCard />;
    } else if (props.pastDelay) {
        return <PlaceholderCard />;
    } else {
        return null;
    }
}

function SofaPage(props) {
    
    const classes = useStyles();
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const [modules, setModules] = useState([]);
    const [layout, setLayout] = useState({});

    useEffect(() => {
        if (props.page) {
            addPageModules(props.page)
        }
    });

    function addModules(modulelist) {
        
        var changes=false;
        var newmodules = {}

        modulelist.map( item => {
            if (modules.hasOwnProperty(item)) {
                newmodules[item]=modules[item]
            } else {
                newmodules[item]=( Loadable({
                    loader: () => import('./'+item), // Here can be any component!
                    loading: cardLoading, }));
                changes=true
            }
        })
        if (changes) {
            //console.log('loading',Object.keys(newmodules),newmodules)
            setModules(newmodules);
        }
    }

    function addPageModules(layout) {
        
        var newmodules = []
            props.page.map( item => 
                newmodules.push(item['module'])
            );
        addModules(newmodules)
    }

    function renderLayoutModule( item, page, index ) {

        if (modules.hasOwnProperty(item['module'])) {
            let Module = modules[item['module']]
            item['props']['wide']=true
            return <Module key={ page+index } {...item['props']} />
        } else {
            //console.log('Did not find',item['module'],'in',modules)
            return null
        }
    }

    return (
        <Grid container item spacing={8} key={props.name} xs={ isMobile ? 12 : 4 } 
            className={ classes.gridColumn}>
            { props.page.map( (item, i) => 
				<ErrorBoundary key={props.name+i} >
					{ renderLayoutModule(item, props.name, i) }
				</ErrorBoundary>
            )}
            {isMobile &&
                <Toolbar className={classes.paddedToolbar}/>
            }
        </Grid>
    );
}

export default withData(SofaPage)
