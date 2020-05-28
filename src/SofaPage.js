import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';

import Grid from '@material-ui/core/Grid';
import ErrorBoundary from './ErrorBoundary';
import PageActions from './PageActions';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles(theme => {
    return {
        gridColumn: {
            margin: 1,
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            padding: "3px !important",
            backgroundColor: theme.palette.layer.section,
            borderRadius: "4px 4px 4px 4px",
            maxWidth: "24%",
        },
        mobileGridColumn: {
            height: "100%",
            margin: 0,
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            padding: "3px !important",
            backgroundColor: theme.palette.layer.section,
            borderRadius: "4px 4px 4px 4px",
        },
        paddedToolbar: {
            paddingBottom: "env(safe-area-inset-bottom)",
            marginBottom: "env(safe-area-inset-bottom)",
        },
        actionsChip: {
            backgroundColor: theme.palette.layer.card,
            '&:hover': {
                borderColor: theme.palette.primary.dark,
            }  
        }
    }
});

export default function SofaPage(props) {
    
    const classes = useStyles();
    const { renderSuspenseModule } = useContext(LayoutContext);
    const [showActions, setShowActions] = useState(false)

    return (
        <ErrorBoundary wide={props.wide}>
            <Grid container item spacing={1} key={props.name} xs={ props.wide ? 12 : 3 } className={ props.wide ? classes.mobileGridColumn : classes.gridColumn}>
                <ListItem>
                    <ListItemText primary={props.name} />
                    { props.page.hasOwnProperty('actions') && 
                       <Chip
                            className={classes.actionsChip}
                            label={ !showActions ? "Actions" : "Close" }
                            clickable
                            onClick={ () => setShowActions(!showActions) }
                          />
                    }
                </ListItem>
                { (props.page.hasOwnProperty('actions') && showActions) && 
                    <PageActions actions={props.page.actions} />
                }
                { props.page.cards.map( (item, i) => 
    				<ErrorBoundary wide={true} key={props.name+i} >
    					{ renderSuspenseModule(item['module'], item['props']) }
    				</ErrorBoundary>
                )}
                {1==2 &&
                    <Toolbar className={classes.paddedToolbar}/>
                }
            </Grid>
        </ErrorBoundary>
    );
}

