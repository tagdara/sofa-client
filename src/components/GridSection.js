import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import useLayoutStore from 'store/layoutStore'
import classNames from 'classnames';

import Grid from '@mui/material/Grid';
import GridSectionTitle from 'components/GridSectionTitle'

const useStyles = makeStyles(theme => {
    return {
        base: {
            display: "flex",
            marginBottom: 2,
            overflowX: "hidden",
            alignContent: "start",
            padding: "8px !important",
            boxSizing: "border-box",
            width: "100% !important",
            maxWidth: "100% !important",
        },
        gridColumn: {
            overflowY: "hidden",
        },
        scrollColumn: {
            overflowY: "auto",
            paddingRight: 32,
        },
    }
});


export default function GridSection(props) {
    
    const isMobile = useLayoutStore( state => state.isMobile )
    const classes = useStyles();
    const [ show, setShow ] = useState(props.show);

    return (
        <Grid container item spacing={(props.single || isMobile) ? 0 : 1} key={props.name} xs={props.xs} 
                className={ classNames(classes.base, props.scroll ? classes.scrollColumn : classes.gridColumn)} >
            <GridSectionTitle name={props.name} break={props.break} secondary={props.secondary} onClick={ () => setShow(!show) } />
            { show && props.children}
        </Grid>
    );
}

GridSection.defaultProps = {
    break: false,
    show: true,
    scroll: false,
    xs: 12,
    background: true,
    margin: false,
}
 

