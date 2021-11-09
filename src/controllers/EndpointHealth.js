import React from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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


