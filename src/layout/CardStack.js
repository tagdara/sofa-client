import React, { useState, useEffect } from 'react';

import { makeStyles } from '@mui/styles';
import { getStack, renderSuspenseModule } from 'store/layoutHelpers';

import Stack from '@mui/material/Stack';

import ErrorBoundary from 'error/ErrorBoundary';
import StackMoreButton from 'layout/StackMoreButton';
import StackPicker from 'layout/StackPicker'

const useStyles = makeStyles(theme => {
    return {
        stack: {
            paddingTop: "env(safe-area-inset-top) !important",
            paddingBottom: "env(safe-area-inset-bottom) !important",
            paddingLeft: "0 !important",
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            boxSizing: "border-box",
            borderRadius: "4px 4px 4px 4px",
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
            //backgroundColor: theme.palette.layer.section,
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
            //backgroundColor: theme.palette.layer.section,
            borderRadius: "4px 4px 4px 4px",
        },
        mobileGridColumn: {
            height: "100%",
            margin: 0,
            overflowX: "hidden",
            //overflowY: "hidden",
            alignContent: "start",
            padding: "3px !important",
            //backgroundColor: theme.palette.layer.section,
            borderRadius: "4px 4px 4px 4px",
        },
        paddedToolbar: {
            paddingBottom: "env(safe-area-inset-bottom)",
            marginBottom: "env(safe-area-inset-bottom)",
        },
        actionsChip: {
            justifyContent: "center",
            marginRight: 6,
            //backgroundColor: theme.palette.layer.card,
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

export default function CardStack(props) {
    
    const classes = useStyles();
    const [ stack, setStack ]=useState(props.stack)
    const [ stackData, setStackData ] = useState(undefined)
    const [ expand, setExpand ]=useState(false)

    //useEffect(() => { 
    //    setStack(props.stack)
    // eslint-disable-next-line             
    // }, [ props.stack] )

    useEffect(() => { 
        if (stack) {
            getStack(stack)
                .then(result=> setStackData(result))
        }
    }, [ stack ] )

    function expandable() {
        if (stackData && stackData.cards) {
            for (var i = 0; i < stackData.cards.length; i++) {
                if (stackData.cards[i].hasOwnProperty('expand')) {
                    return true
                }
            }
        }
        return false
    }

    if (!stack) { return null}

    // <Grid container item spacing={0} key={props.name} xs={ props.xs } className={ classes.stack } >


    return (
        <Stack spacing={1}>
            <div className={classes.pageHeader}>
                {props.showTitle &&
                    <StackPicker stack={stack} setStack={setStack} />
                }
                { expandable() && <StackMoreButton expand={expand} onClick={ () => setExpand(!expand)} /> } 

            </div>
            { stackData &&
                <>
                { stackData.cards && stackData.cards.map( (card, i) => 
                    <React.Fragment key={"card"+i}>
                    { (!card.hasOwnProperty('expand') || card['expand']===expand ) ?
                    <ErrorBoundary>
                        { renderSuspenseModule(card['module'], card['props']) }
                    </ErrorBoundary>
                    :
                    null
                    }
                    </React.Fragment >
                )}
                </>
            }
        </Stack>
    );
}

CardStack.defaultProps = {
    showTitle: true,
}