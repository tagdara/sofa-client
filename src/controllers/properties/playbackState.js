import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function PlaybackState(props) {
    
    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'MusicController', "SetPlaybackState" , { "playbackState" : "STOPPED" }, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])

    
    function handleChange(e) {
        props.directive(props.device.endpointId, 'MusicController', "SetPlaybackState" , { "playbackState" : e.target.value }, {}, props.item.instance)
    }
    
    return (
        <Select value={props.item.value ? props.item.value.playbackState : "" } onChange={handleChange} size="small" >
            <MenuItem value=""><em>Choose a property</em></MenuItem>
            <MenuItem value="PLAYING">Playing</MenuItem>
            <MenuItem value="PAUSED">Paused</MenuItem>
            <MenuItem value="STOPPED">Stopped</MenuItem>
            <MenuItem value="IDLE">Idle</MenuItem>
        </Select>
    );

}


