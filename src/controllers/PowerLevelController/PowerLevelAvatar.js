import React from 'react';
import ColorAvatar from 'components/ColorAvatar';

import grey from '@mui/material/colors/grey';
import green from '@mui/material/colors/green';
import orange from '@mui/material/colors/orange';

const PowerLevelAvatar = props => {

    const powerColor = ( power ) => {
        switch (true) {
            case (!power):
                return grey[500]
            case (power < 75): 
                return green[700]
            case (power >=75 ): 
                return orange[500]
            default:
                return grey[500]
        }
    }
    
    return (
        <ColorAvatar small={ props.small || props.size==="small" } color={powerColor(props.value)} onClick={props.onClick} reverse={true}>
            { props.value }
        </ColorAvatar>
    );
}

export default PowerLevelAvatar;
