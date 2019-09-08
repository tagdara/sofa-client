import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
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
            padding: "3px !important",
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

export default function SofaPage(props) {
    
    const classes = useStyles();
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const [modules, setModules] = useState([]);
    
    useEffect(() => {
        
        function addModules(modulelist) {
            
            var newmodules = {}
            modulelist.forEach( item => {
                console.log('Loading module',item)
                newmodules[item]=React.lazy( () => import('./'+item) )
            })
            setModules(newmodules);
        }

        if (props.page) {
            var newmodules = []
            props.page.map( item => 
                newmodules.push(item['module'])
            );
            addModules(newmodules)
        }
    },[props.page]);

    function renderSuspenseLayoutModule( item, page, index ) {
        
        if (modules.hasOwnProperty(item['module'])) {
            let Module = modules[item['module']]
            item['props']['wide']=true
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

