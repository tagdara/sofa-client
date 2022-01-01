import React, { useState} from 'react';
import { AiOutlineQrcode } from 'react-icons/ai'
import SectionHeader from 'components/SectionHeader';
import SectionFrame from 'layout/SectionFrame'
import SectionGrid from 'layout/SectionGrid'
import PageFrame from 'layout/PageFrame'
import { endpointIdsByDisplayCategory, sortByName }  from 'store/deviceHelpers'
import SecurityCamera from 'devices/Camera/SecurityCamera';
import { ActionIcon } from '@mantine/core';
import UnifiProtectButton from 'devices/Camera/UnifiProtectButton'
import HomeButton from 'layout/HomeButton';

const CameraLayout = props => {

    const cameras = sortByName(endpointIdsByDisplayCategory('CAMERA'))
    const [ showQR, setShowQR]=useState(false)
    const homekitSupport = false

    return (
        <PageFrame>
            <SectionHeader title={"Cameras"} >
                { homekitSupport &&
                    <ActionIcon onClick={ () => setShowQR(!showQR) }>
                        <AiOutlineQrcode size={20}  />
                    </ActionIcon> 
                }
            </SectionHeader>
            <SectionFrame>
                <SectionGrid>
                { cameras.map(camera => 
                    <SecurityCamera key={camera} endpointId={camera} showQR={showQR} />
                )}
                </SectionGrid>
            </SectionFrame>
            <SectionHeader>
                <UnifiProtectButton />
                <HomeButton />
            </SectionHeader>
        </PageFrame>
    )
}

export default CameraLayout
