import React, { useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';

import IconButton from '@mui/material/IconButton';
import Videocam from '@mui/icons-material/Videocam';


export default function CameraSummary(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    
    return (
            <IconButton onClick={ () => applyLayoutCard('CameraLayout') }>
                <Videocam />
            </IconButton>
    );
}
