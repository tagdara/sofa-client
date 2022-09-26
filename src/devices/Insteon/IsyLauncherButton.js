import React from 'react';
import { useOs } from '@mantine/hooks';
import { Button } from '@mantine/core';
import { IconTableOptions } from '@tabler/icons';

const IsyLauncherButton = props => {

    const os = useOs();

    if (os === "ios") { return null }   

    function openApp() {
        //var newurl="https://unifi.ui.com/dashboard"
        var newurl = process.env.PUBLIC_URL + '/resources/start.jnlp'
        var tabname="_isy"
        window.open(newurl,tabname);
    }

    return (
        <Button variant="light" size={ "md" } fullWidth leftIcon={<IconTableOptions size={16} />} onClick={() => openApp() } >
            ISY Admin
        </Button>
    )
}

export default IsyLauncherButton
