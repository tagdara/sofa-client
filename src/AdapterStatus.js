import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

import GridItem from './GridItem'

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
            </ListItem>
       </GridItem>
    );
}

