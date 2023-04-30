import React from 'react';
import { Divider, Group, Text } from '@mantine/core'
import PullUpCard from 'layout/pullup/PullUpCard'
import PowerStateLine from 'endpoint-model/property/powerState/PowerStateLine'
import PrinterCam from 'devices/Octoprint/PrinterCam'
import PrinterLink from 'devices/Octoprint/PrinterLink'

const PrinterSheet = props => {

    return (  
        <PullUpCard title={"3D Printer"} name={"3dprinter"}>
            <PrinterCam zoom={true} />
            <Divider />
            <PowerStateLine icon label="Printer Power" endpointId={props.endpointId} />     
            <PowerStateLine icon label="Printer Light" endpointId={props.lightEndpointId} />     
            <Group>
                <PrinterLink />
                <Text>Octoprint</Text>
            </Group>       
        </PullUpCard>
    )

}

export default PrinterSheet;
