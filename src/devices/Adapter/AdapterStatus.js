import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import ClearIcon from '@material-ui/icons/Clear';

import GridItem from 'components/GridItem'


export default function AdapterStatus(props) { 

    return (
        <GridItem wide={true} >
            <ListItem>
                <TextField
                    fullWidth={true}
                    multiline={true}
                    label={props.name}
                    value={props.status}
                />                
                <ListItemSecondaryAction>
                    <IconButton onClick={ () => props.clear() } >
                        <ClearIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
       </GridItem>
    );
}

