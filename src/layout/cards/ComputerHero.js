import React from 'react';
import MatrixSummary from 'devices/Matrix/MatrixSummary'
import ComputerCubes from 'devices/Computer/ComputerCubes'
import { selectPage } from 'helpers/layoutHelpers';
import StackCard from 'layout/components/StackCard'
import StackRow from 'layout/components/StackRow'
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'

export default function ComputerHero(props) {
   
    // This stuff really needs to be moved to config and autodetect, maybe solve with virtual device combining PC and plug
    const computerPlugs=["PC1 outlet", "PC2 outlet", "PC3 outlet", "PC4 outlet"]
    const computerPlugEndpoints=computerPlugs.map( plug => endpointIdByFriendlyName(plug))

    return (
        <>
            <StackCard hidden={props.hidden}>
                <MatrixSummary endpointIds={computerPlugEndpoints} onClick={ ()=> selectPage('ComputerPage') } />
            </StackCard>
            <StackRow>
                <ComputerCubes />
            </StackRow>
            
        </>
    );
}
