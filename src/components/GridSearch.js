import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash/debounce';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => {
    return {
       smallContent: {
            display: 'flex',
            margin: 0,
            boxSizing: "border-box",
            padding: 0,
            flexWrap: 'wrap',
            alignItems: "center",
            flexGrow: 1,
            flexBasis: 0,
            position: "relative",
            overflowY: "auto",
        },   
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
            overflowY: "auto",
        },
        thinmargin: {
            margin: 2,
            padding: 0,
        },
        normal: {
            padding: "4px !important",
        },
        textField: {
            backgroundColor: theme.palette.background.default,
            borderRadius: 4,
            padding: 4,
        }
    }
});


export default function GridItem(props) {
    
    const mobileBreakpoint = 800
    const classes = useStyles();
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const delayedSearch = debounce(q => props.setSearchValue(q), 500);
    const [ search, setSearch]=useState(props.searchValue)
    
    function handleChange(newsearch) {
        setSearch(newsearch)
        delayedSearch(newsearch)
    }

    if (props.small) {
        return (
            <Grid   item xs={props.xs ? props.xs : (isMobile || props.wide ? 12 : 4) } 
                    className={ classes.thinmargin }>
                <Paper elevation={props.elevation} className={classes.smallContent} >
                    <TextField
                        className={classes.textField}
                        autoFocus
                        InputProps={{   disableUnderline: true,
                                        startAdornment: <InputAdornment position="start">{ props.startIcon }</InputAdornment>,
                        }}
                        fullWidth
                        label={'Search'}
                        value={search}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </Paper>
            </Grid>
        )
    }
    
    return (
        <Grid item xs={props.xs ? props.xs : (isMobile || props.wide ? 12 : 4) } className={ props.thinmargin ? classes.thinmargin: classes.normal}>
            <Paper elevation={props.elevation} className={classes.content} >
                <TextField
                    autoFocus
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                    label={'Search'}
                    value={search}
                    onChange={(e) => handleChange(e.target.value)}
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
