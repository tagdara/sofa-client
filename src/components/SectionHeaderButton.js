import React  from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    
    button: {
        minWidth: 36
    },
});

const SectionHeaderButton = props => {

    const classes = useStyles();

    return (    
        <Button onClick={props.onClick} 
                sx={{ color: props.on ? 'primary.main' : 'action.disabled' }} 
                className={classes.button }>
            { props.children }
        </Button>
    )
}

export default SectionHeaderButton;