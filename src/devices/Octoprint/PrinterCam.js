import React from 'react';
import { Image } from '@mantine/core'

const PrinterCam = props => {

    const name = "3D Printer"
    const serverUrl = "https://octoprint.dayton.tech"
    const streamUrl = serverUrl + "/webcam/?action=stream"

    return (
        <Image 
            radius="sm"
            height={ props.zoom ? "auto" : 56}
            width={ props.zoom ? "100%" : 74}
            src={ streamUrl }
            title={ name }
            alt={ name }
            onClick={ (e) => props.setZoom(!props.zoom)}
        />
    )

}

export default PrinterCam;
