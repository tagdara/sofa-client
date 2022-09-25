import React from 'react';
import ComputerSummary from 'devices/Computer/ComputerSummary'
import { selectPage } from 'helpers/layoutHelpers';
import StackCard from 'layout/components/StackCard'
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'

export default function ComputerHero(props) {
   
    // This stuff really needs to be moved to config and autodetect, maybe solve with virtual device combining PC and plug
    const computerPlugs=["PC1 outlet", "PC2 outlet", "PC3 outlet", "PC4 outlet"]
    const computerPlugEndpoints=computerPlugs.map( plug => endpointIdByFriendlyName(plug))

    return (
        <StackCard hidden={props.hidden}>
            <ComputerSummary endpointIds={computerPlugEndpoints} onClick={ ()=> selectPage('ComputerPage') } />
        </StackCard>
    );
}
