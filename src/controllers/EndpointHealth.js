import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function EndpointHealth(props) {

    return (
        <TableRow>
            <TableCell>
                Health
            </TableCell>
            <TableCell>
                {props.interface.connectivity.value.value}
            </TableCell>
            <TableCell>
                &nbsp;
            </TableCell>
        </TableRow>
    );

}


