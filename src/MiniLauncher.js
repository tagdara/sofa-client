import React from 'react';
import { withThemeChange } from './DataContext/withThemeChange';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import CloseIcon from '@material-ui/icons/Close';
import DialpadIcon from '@material-ui/icons/Dialpad';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TuneIcon from '@material-ui/icons/Tune';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

import GridItem from './GridItem';

function MiniLauncher(props) {

    return (
        <GridItem wide={props.wide}>
            <ListItem onClick={ () => props.setLayoutCard('MoreDevicesLayout',{}) } >
                <Avatar><DevicesOtherIcon /></Avatar>
                <ListItemText primary={props.name}/>
            </ListItem>
        </GridItem>
    );
}

export default withThemeChange(MiniLauncher);
