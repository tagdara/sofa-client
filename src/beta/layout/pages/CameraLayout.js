import React, { useState} from 'react';
import { AiOutlineQrcode } from 'react-icons/ai'


import SectionHeader from 'beta/components/SectionHeader';
import { PageFrame } from 'beta/components/PageFrame'
import UbiquitiIcon from 'resources/UbiquitiIcon';
import { endpointIdsByDisplayCategory, sortByName }  from 'store/deviceHelpers'
import SecurityCamera from 'beta/devices/Camera/SecurityCamera';
import { SplitButtonGroup, SplitButton } from 'beta/components/SplitButton'
import { ActionIcon, Group } from '@mantine/core';


const CameraLayout = props => {

    const cameras = sortByName(endpointIdsByDisplayCategory('CAMERA'))
    const [ showQR, setShowQR]=useState(false)
    const homekitSupport = false
    
    function openProtect() {
        var newurl="https://unifi.dayton.tech/protect"
        var tabname="_protect"
        window.open(newurl,tabname);
    }
    
    return (
        <Group direction="column">
            <SectionHeader title={"Cameras"} >
                { homekitSupport &&
                    <ActionIcon onClick={ () => setShowQR(!showQR) }>
                        <AiOutlineQrcode size={20}  />
                    </ActionIcon> 
                }
            </SectionHeader>
            <PageFrame>
                { cameras.map(camera => 
                    <SecurityCamera key={camera} endpointId={camera} showQR={showQR} />
                )}
            </PageFrame>
            <PageFrame>
                <SplitButtonGroup>
                    <SplitButton>
                        <ActionIcon onClick={() => openProtect() }>
                            <UbiquitiIcon />
                        </ActionIcon> 
                    </SplitButton>
                    <SplitButton label={"Unifi Protect"} onClick={() => openProtect() } />
                </SplitButtonGroup>
            </PageFrame>
        </Group>
    )
}

export default CameraLayout
