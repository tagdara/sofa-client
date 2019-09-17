import React from 'react';
import { useState, useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import SofaSlider from './SofaSlider';
import ToggleAvatar from './ToggleAvatar'

export default function SofaAvatarSlider(props) {

    const [value, setValue] = useState(0);

    useEffect(() => {
  	    setValue(props.value)
    }, [props.value]);

    function handlePreChange(value) {
        setValue(value)
        if (props.hasOwnProperty('preChange')) {
            props.preChange(value)
        }
    }; 
    
    return (
        <ListItem>
            <ToggleAvatar onClick={props.avatarClick} noback={props.noAvatarBack} avatarState={ props.avatarState }>
                {value}
            </ToggleAvatar>
            <SofaSlider {...props} preChange={handlePreChange} />
        </ListItem>
    );
}

SofaAvatarSlider.defaultProps = {
    avatarClick:undefined,
    noAvatarBack: false,
    avatarState: "on",
}

