import React from 'react';
import { useOs } from '@mantine/hooks';

import UbiquitiIcon from 'resources/UbiquitiIcon';
import { SplitButtonGroup, SplitButton } from 'components/SplitButton'
import { ActionIcon } from '@mantine/core';

const UnifiProtectButton = props => {

    const os = useOs();

    function openProtect() {
        var newurl="https://unifi.ui.com/dashboard"
        if (os === "ios") {
            newurl = "unifi-protect://placeholder"
        }
        var tabname="_protect"
        window.open(newurl,tabname);
    }
    
    return (
        <SplitButtonGroup>
            <SplitButton>
                <ActionIcon onClick={() => openProtect() }>
                    <UbiquitiIcon />
                </ActionIcon> 
            </SplitButton>
            <SplitButton label={"Unifi Protect"} onClick={() => openProtect() } />
        </SplitButtonGroup>
    )
}

export default UnifiProtectButton
