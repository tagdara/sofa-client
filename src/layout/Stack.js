import React, { useContext, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from 'layout/LayoutProvider';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ErrorBoundary from 'error/ErrorBoundary';
import StackMoreButton from 'layout/StackMoreButton';

const useStyles = makeStyles(theme => {
    return {
        stack: {
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            padding: "4px !important",
            //border: "1px solid "+ theme.palette.layer.section,
            //backgroundColor: theme.palette.layer.section,
            //display: "flex",
            borderRadius: "4px 4px 4px 4px",
            //border: "1px solid "+theme.palette.background.default,
        },
        title: {
            display: "flex",
            flexGrow: 2,
            whiteSpace: "nowrap",
        },
        pageHeader: {
            width: "100%",
            display: "flex",
            alignItems: "end",
            padding: 6,
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
            justifyContent: "center",
            marginRight: 6,
            backgroundColor: theme.palette.layer.card,
            '&:hover': {
                borderColor: theme.palette.primary.dark,
            }  
        },
        actionsChipIcon: {
            height: 28,
            width: 28,
        }
    }
});

export default function Stack(props) {
    
    const classes = useStyles();
    const { getStack, renderStackModule } = useContext(LayoutContext);
    const [ stack, setStack ]=useState({})
    const [ expand, setExpand ]=useState(false)

    useEffect(() => { 
        if (props.stack) {
            getStack(props.stack)
                .then(result=> setStack(result))
        }
    // eslint-disable-next-line             
    }, [ props.stack] )


    function expandable() {
        if (stack.cards) {
            for (var i = 0; i < stack.cards.length; i++) {
                if (stack.cards[i].hasOwnProperty('expand')) {
                    return true
                }
            }
        }
        return false
    }

    return (
        stack ?
            <Grid container item spacing={0} key={props.name} xs={ props.xs } className={ classes.stack } >
                <div className={classes.pageHeader}>
                    {props.showTitle &&
                        <Typography variant="subtitle1" className={classes.title} >{stack.name}</Typography>
                    }
                    { expandable() && <StackMoreButton expand={expand} onClick={ () => setExpand(!expand)} /> } 
                </div>
                { stack.cards && stack.cards.map( (card, i) => 
                    <React.Fragment key={"card"+i}>
                    { (!card.hasOwnProperty('expand') || card['expand']===expand ) ?
                    <ErrorBoundary>
                        { renderStackModule(card['module'], card['props']) }
                    </ErrorBoundary>
                    :
                    null
                    }
                    </React.Fragment >
                )}
            </Grid>
        : null
    );
}

Stack.defaultProps = {
    showTitle: true,
}
