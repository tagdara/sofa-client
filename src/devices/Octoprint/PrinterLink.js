import React from 'react';
import { ActionIcon } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons';

const PrinterLink = props => {

    const serverUrl = "https://octoprint.dayton.tech"

    function openOctoPrint() {
        var tabname="_octoprint"
        window.open(serverUrl,tabname);
    }

    return (
        <ActionIcon onClick={ () => openOctoPrint() }>
            <IconExternalLink size={20} />
        </ActionIcon>
    )

}

export default PrinterLink
