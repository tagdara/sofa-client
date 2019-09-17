import React from 'react';
import { makeStyles } from '@material-ui/styles';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import LensIcon from '@material-ui/icons/Lens';

const useStyles = makeStyles({
        
    wide: {
        width: "100%",
    },
    indent: {
        paddingLeft: 40,
        paddingRight: 8,
    },
    button: {
        minWidth: 24
    },
    revealIcon: {
        height: 24,
        width: 24,
        color: "FFE4B5",
    }
});

export default function StateController(props) {
    
    const classes = useStyles();

    return (
        <TableRow>
            <TableCell>
                State
            </TableCell>
            <TableCell>
                { props.interface.savedState.value.length>0 ? 'True': 'False'}
            </TableCell>
            <TableCell>
                <Button size="small" onClick={ () => props.interface.directive('Capture') } color={ "primary" } className={classes.button }>
                    <LensIcon className={classes.revealIcon} />
                </Button>
                <Button size="small" onClick={ () => props.interface.directive('Reset') } color={ "default"} className={classes.button }>
                    <LensIcon className={classes.revealIcon} />
                </Button>
            </TableCell>
        </TableRow>
    );

}


