import React from 'react';

import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import useLayoutStore from 'store/layoutStore'

const useStyles = makeStyles(theme => {
    return {
        title: {
            display: "flex",
            flexGrow: 2,
            whiteSpace: "nowrap",
        },
        select: {
            display: "flex",
            flexGrow: 1,
        }
    }
});

const StackPicker = props => {
    const stackLayout = useLayoutStore(state => state.stackLayout )    
    const isMobile = useLayoutStore(state => state.isMobile ) 
    const classes = useStyles();
    const minStackWidth = useLayoutStore(state => state.minStackWidth )
    const maxScreenWidth = useLayoutStore(state => state.maxScreenWidth )
    const maxStacks = Math.min(4, Math.round( maxScreenWidth / minStackWidth))

    // using length -1 to skip admin but probably a better way
    if (isMobile || (stackLayout.length -1 <= maxStacks)) { 
        return <Typography variant="subtitle1" className={classes.title} >
                    {props.stack}
                </Typography>
    }

    return (
        <Select className={classes.select} displayEmpty disableUnderline
                value={ props.stack } 
                onChange={ (e)=> props.setStack(e.target.value)} 
            >
            { stackLayout.map( stack => 
                <MenuItem   key = { stack } 
                            value={ stack}>
                    { stack }
                </MenuItem>
            )}
        </Select>
    );
}

export default StackPicker;
