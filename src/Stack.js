import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';

import Grid from '@material-ui/core/Grid';
import PageActions from './PageActions';
import Chip from '@material-ui/core/Chip';
import ErrorBoundary from './ErrorBoundary';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => {
    return {
        stack: {
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            padding: "3px !important",
            backgroundColor: theme.palette.layer.section,
            //display: "flex",
            borderRadius: "4px 4px 4px 4px",
            border: "1px solid "+theme.palette.background.default,
        },
        title: {
            padding: 8,
            display: "flex",
            flexGrow: 2,
            whiteSpace: "nowrap",
        },
        pageHeader: {
            width: "100%",
            display: "flex",
        },

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
        gridWide: {
            margin: "0px 2px",
            boxSizing: "border-box",
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            padding: "3px !important",
            backgroundColor: theme.palette.layer.section,
            borderRadius: "4px 4px 4px 4px",
        },
        mobileGridColumn: {
            height: "100%",
            margin: 0,
            overflowX: "hidden",
            //overflowY: "hidden",
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
            margin: 6,
            backgroundColor: theme.palette.layer.card,
            '&:hover': {
                borderColor: theme.palette.primary.dark,
            }  
        },
    }
});

export default function Stack(props) {
    
    const classes = useStyles();
    const { getStack, renderSuspenseModule } = useContext(LayoutContext);
    const [showActions, setShowActions] = useState(false)
    const [ stack, setStack ]=useState({})

    useEffect(() => { 
        if (props.stack) {
            getStack(props.stack)
                .then(result=> setStack(result))
        }
    // eslint-disable-next-line             
    }, [ props.stack] )

    return (
        stack ?
            <Grid container item spacing={0} key={props.name} xs={ props.xs } className={ classes.stack } >
                <div className={classes.pageHeader}>
                    <Typography variant="subtitle1" className={classes.title} >{stack.name}</Typography>
                    { ( stack.hasOwnProperty('actions') ) && 
                       <Chip
                            className={classes.actionsChip}
                            label={ !showActions ? "Actions" : "Close" }
                            clickable
                            onClick={ () => setShowActions(!showActions) }
                          />
                    }
                </div>
                { (stack.hasOwnProperty('actions') && showActions) && 
                    <PageActions actions={stack.actions} name={stack.name} />
                }
                { stack.cards && stack.cards.map( (card, i) => 
                    <ErrorBoundary key={"card"+i}>
                        { renderSuspenseModule(card['module'], card['props']) }
                    </ErrorBoundary>
                )}
            </Grid>
        : null
    );
}


