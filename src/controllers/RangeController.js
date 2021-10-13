import React from 'react';
import { makeStyles } from '@material-ui/styles';

import SmallSlider from 'components/SmallSlider';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
        
    indent: {
        paddingLeft: 40,
        paddingRight: 8,
    },
    nobreak: {
        whiteSpace: "nowrap",
        alignItems: "center",
    }
});

export default function RangeController(props) {
    
    const classes = useStyles();
    const name = props.instance.split('.')[1]

    function handleChange(event) {
        props.interface.directive('SetRangeValue', { "rangeValue" : event })
    }; 

    return (
        <TableRow>
            <TableCell>
                {name}
            </TableCell>
            <TableCell>{props.interface.rangeValue.value+"%"}</TableCell>
            <TableCell className={classes.nobreak} >
                <SmallSlider
                    value={props.interface.rangeValue.value}
                    min={0} max={100} step={10}
                    change={handleChange}
                />
            </TableCell>
        </TableRow>
    );
}

