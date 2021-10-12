import React  from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    
    button: {
        minWidth: 36
    },
});

const SectionHeaderButton = props => {

    const classes = useStyles();

    return (    
        <Button onClick={props.onClick} color={ props.on ? "primary" : "default"} className={classes.button }>
            { props.children }
        </Button>
    )
}

export default SectionHeaderButton;