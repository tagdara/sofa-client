import React, { useState} from 'react';
import { QrCode } from 'react-bootstrap-icons'
import SectionHeader from 'layout/section/SectionHeader';
import SectionFrame from 'layout/section/SectionFrame'
import SectionGrid from 'layout/section/SectionGrid'
import PageFrame from 'layout/PageFrame'
import { endpointIdsByDisplayCategory, sortByName }  from 'endpoint-model/discovery'
import SecurityCamera from 'devices/Camera/SecurityCamera';
import { ActionIcon, Portal } from '@mantine/core';
import UnifiProtectButton from 'devices/Camera/UnifiProtectButton'

const CameraLayout = props => {

    const cameras = sortByName(endpointIdsByDisplayCategory('CAMERA'))
    const [ showQR, setShowQR]=useState(false)
    const homekitSupport = false

    return (
        <PageFrame>
            <SectionHeader title={"Cameras"} >
                { homekitSupport &&
                    <ActionIcon onClick={ () => setShowQR(!showQR) }>
                        <QrCode size={20}  />
                    </ActionIcon> 
                }
            </SectionHeader>
            <SectionFrame padScroll >
                <SectionGrid>
                { cameras.map(camera => 
                    <SecurityCamera key={camera} endpointId={camera} showQR={showQR} />
                )}
                </SectionGrid>
            </SectionFrame>
            <Portal target="#bottomPortal">
                <UnifiProtectButton />
            </Portal>
        </PageFrame>
    )
}

export default CameraLayout
