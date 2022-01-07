import React, { useState } from 'react';
import ComputerSummary from 'devices/Computer/ComputerSummary'
import MonitorButtonStackGroup from 'devices/Computer/MonitorButtonStackGroup';
import MatrixList from 'devices/Matrix/MatrixList';
import { selectPage } from 'helpers/layoutHelpers';
//import { Card } from '@mantine/core';
import StackCard from 'components/StackCard'
import { endpointIdByFriendlyName } from 'store/deviceHelpers';
import { Collapse, Group } from '@mantine/core'
export default function ComputerHero(props) {
    
    const [ expandMonitors, setExpandMonitors ]=useState()
    const [ expanded, setExpanded ] = useState(false)

    // This stuff really needs to be moved to config and autodetect, maybe solve with virtual device combining PC and plug
    const computerPlugs=["PC1 outlet", "PC2 outlet", "PC3 outlet", "PC4 outlet"]
    const computerPlugEndpoints=computerPlugs.map( plug => endpointIdByFriendlyName(plug))

    const buttonLayout = {
        O:   [   
            { endpointId: "matrix:output:O1", label: "1", defaultInput: "Input.I1", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E00"},
            { endpointId: "matrix:output:O3", label: "2", defaultInput: "Input.I2", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E01"},
            { endpointId: "matrix:output:O6", label: "3", defaultInput: "Input.I3", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E02"},
            { endpointId: "matrix:output:O7", label: "4", defaultInput: "Input.I4", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E03"}
        ],
        D: [   
            { endpointId: "matrix:output:O2", label: "1", defaultInput: "Input.I1", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E00"},
            { endpointId: "matrix:output:O4", label: "2", defaultInput: "Input.I2", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E01"},
        ]
    }

    const toggleExpand = () => {
        setExpandMonitors(!expandMonitors)
    }

    return (
        <StackCard>
            <Group direction="column">
                <ComputerSummary endpointIds={computerPlugEndpoints} onClick={ () => setExpanded(!expanded) } />
                <Collapse in={expanded} style={{ width: "100%"}}>
                    <MonitorButtonStackGroup buttonLayout={buttonLayout} outlets={computerPlugs} topClick={toggleExpand} bottomClick={ () => selectPage('ComputerLayout') } />
                </Collapse> 
                <Collapse in={expandMonitors} style={{ width: "100%"}}>
                    <MatrixList />
                </Collapse> 
            </Group>
        </StackCard>
    );
}
