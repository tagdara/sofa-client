import React from 'react';
import ColorAvatar from 'components/ColorAvatar';

import grey from '@mui/material/colors/grey';
import green from '@mui/material/colors/green';
import orange from '@mui/material/colors/orange';

const VolumeAvatar = props => {

    const volumeColor = ( volume ) => {
        switch (true) {
            case (!volume):
                return grey[500]
            case (volume > 75): 
                return orange[500]
            case (volume > 0): 
                return green[700]
            default:
                return grey[500]
        }
    }
    
    return (
        <ColorAvatar small={ props.small || props.size==="small" } color={volumeColor(props.volume)} onClick={props.onClick} reverse={true}>
            { props.volume }
        </ColorAvatar>
    );
}

export default VolumeAvatar;
