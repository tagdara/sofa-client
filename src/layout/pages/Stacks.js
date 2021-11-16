import React, { useEffect } from 'react';
import CardStack from 'layout/CardStack';
import Grid from '@mui/material/Grid';
import useLayoutStore from 'store/layoutStore'
import { refreshStackLayout } from 'store/layoutHelpers'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => {
    return {
        stack: {
            paddingTop: "env(safe-area-inset-top) !important",
            paddingBottom: "env(safe-area-inset-bottom) !important",
            paddingLeft: "4px !important",
            paddingRight: "4px !important",
            boxSizing: "border-box",
        },
    }
})

export default function Stacks(props) {

    const classes = useStyles();
    const stackLayout = useLayoutStore(state => state.stackLayout )
    const currentStack = useLayoutStore(state => state.currentStack )
    const minStackWidth = useLayoutStore(state => state.minStackWidth )
    const maxScreenWidth = useLayoutStore(state => state.maxScreenWidth )
    const maxStacks = Math.min(4, Math.round( maxScreenWidth / minStackWidth))

    useEffect(() => {
        refreshStackLayout()
    }, [])

    if ( !stackLayout || !Object.keys(stackLayout).length ) { return null }

    function filterStacks() {
        if (maxStacks===1) {
            if (currentStack && stackLayout.includes(currentStack)) {
                return [currentStack]
            }
            return stackLayout.slice(0, 1)
        }
        return stackLayout.slice(0,maxStacks)
    }

    return (
        <>
            { filterStacks().map( stack =>
                <Grid item key={stack} xs={ Math.floor( 12/maxStacks )} className={classes.stack} >
                    <CardStack stack={ stack }  />
                </Grid>
            )}
        </>
    );
}
