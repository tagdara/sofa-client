import React, { useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';

import IconButton from '@material-ui/core/IconButton';
import Videocam from '@material-ui/icons/Videocam';


export default function CameraSummary(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    
    return (
            <IconButton onClick={ () => applyLayoutCard('CameraLayout') }>
                <Videocam />
            </IconButton>
    );
}
