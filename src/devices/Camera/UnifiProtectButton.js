import React from 'react';
import { useOs } from '@mantine/hooks';

import UbiquitiIcon from 'resources/UbiquitiIcon';
import { SplitButtonGroup, SplitButton } from 'components/SplitButton'
import { ActionIcon } from '@mantine/core';

const UnifiProtectButton = props => {

    const os = useOs();

    function openProtect() {
        //var newurl="https://unifi.ui.com/dashboard"
        var newurl = "https://unifi.ui.com/device/057da3b8-6e25-480c-aa75-b605aadc8d92:1432712978/protect/liveview/5ef7ab88015aca03e700042d"
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
