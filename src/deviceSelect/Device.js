import React, { useState } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


import GridItem from '../GridItem';

import CommentIcon from '@material-ui/icons/Comment';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import SpeakerIcon from '@material-ui/icons/Speaker';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import TuneIcon from '@material-ui/icons/Tune';
import ListIcon from '@material-ui/icons/List';
import TvIcon from '@material-ui/icons/Tv';
import LightbulbOutlineIcon from '../LightbulbOutline';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';


export default function Device(props) {

    const icons = {'SCENE_TRIGGER':TuneIcon, 'ACTIVITY_TRIGGER':ListIcon, 'LIGHT':LightbulbOutlineIcon, 'BUTTON':TouchAppIcon, 'SPEAKER':SpeakerIcon, 'THERMOSTAT':DataUsageIcon, 'RECEIVER':SpeakerGroupIcon, 'TV':TvIcon}
    const [showDetail, setShowDetail] = useState(false);     

    function getIcon(category, size='default') {
            
        var pxSize=24;
        var RealIcon=DeveloperBoardIcon 
        if (size==='small') {
            pxSize=16
        }
        if (icons.hasOwnProperty(category)) {
            RealIcon=icons[category]
        } 

        return <RealIcon size={pxSize} fontSize={size} />
    }

    return (
        <GridItem nopad={true}>
            <ListItem button onClick={props.select? () => props.select(props.device) : () => setShowDetail(!showDetail)}>
                <ListItemIcon>{getIcon(props.device.displayCategories)}</ListItemIcon>
                <ListItemText primary={props.device.friendlyName} secondary={props.device.displayCategories} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="See Details" onClick={() => props.showDevice(props.device) }>
                        <CommentIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            { showDetail &&
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
            }
        </GridItem>
    )
}

