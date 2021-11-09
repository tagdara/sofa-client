import React from 'react';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function DeviceDetail(props) {

    return (
        <>
            { props.device.interfaces.map( iface => 
                <ListItem key={iface}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>{iface}</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { ( props.mode==='all' || props.mode==='property' || props.mode==='' ) &&
                            <>
                                { props.device[iface].properties.map( iprop =>
                                <TableRow hover key={iface+iprop} onClick={() => props.select(iface, iprop)}>
                                    <TableCell>{iprop}</TableCell>
                                    { typeof props.device[iface][iprop].deepvalue==='object' ?
                                        <TableCell>{JSON.stringify(props.device[iface][iprop].deepvalue).slice(0, 10)}</TableCell>
                                        :
                                        <TableCell>{props.device[iface][iprop].deepvalue}</TableCell>
                                    }
                                </TableRow>
                                )}
                            </>
                            }
                            { ( props.mode==='all' || props.mode==='directive' || props.mode==='' ) &&
                            <>
                                { Object.keys(props.directives[iface]).map( idir =>
                                    <TableRow hover key={iface+idir} onClick={() => props.select(iface, idir)}>
                                        <TableCell>{idir}</TableCell>
                                        <TableCell>directive</TableCell>
                                    </TableRow>
                                )}
                            </>
                            }
                        </TableBody>
                    </Table>
                </ListItem>
            )}
        </>
    )
}

