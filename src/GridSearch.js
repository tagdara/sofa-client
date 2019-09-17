import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => {
    return {
   
        content: {
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: theme.palette.divider,
            display: 'flex',
            margin: 0,
            boxSizing: "border-box",
            padding: "8px 16px",
            flexWrap: 'wrap',
            alignItems: "center",
            flexGrow: 1,
            minWidth: "320px",
            minHeight: 80,
            flexBasis: 0,
            position: "relative",
        },
        thinmargin: {
            margin: 2,
            padding: 0,
        },
        normal: {
            padding: "4px !important",
        }
    }
});


export default function GridItem(props) {
    
    const mobileBreakpoint = 800
    const classes = useStyles();
    const isMobile = window.innerWidth <= mobileBreakpoint;

    return (
        <Grid item xs={props.xs ? props.xs : (isMobile || props.wide ? 12 : 4) } className={ props.thinmargin ? classes.thinmargin: classes.normal}>
            <Paper elevation={props.elevation} className={classes.content} >
                <TextField
                    fullWidth
                    label={'Search'}
                    value={props.searchValue}
                    onChange={(e) => props.setSearchValue(e.target.value)}
                />
            </Paper>
        </Grid>
    );
}

GridItem.defaultProps = {
    elevation: 0,
    wide: false,
    thinmargin: false,
    nopaper: false,
}
