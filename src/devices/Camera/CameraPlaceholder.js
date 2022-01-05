import React from 'react';
import { Loader, Paper } from '@mantine/core';

const CameraPlaceholder = props => {

    return (
        <Paper style={{ 
                    width: "100%", 
                    aspectRatio: "16/9", 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center" 
                }}
        >
            <Loader style={{ display: props.loading ? undefined : "none", maxWidth: "30%" }} />
        </Paper>
    )
}

export default CameraPlaceholder;
