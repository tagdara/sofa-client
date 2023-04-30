import React from 'react';
import PrinterSummary from 'devices/Octoprint/PrinterSummary'
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import { selectPage } from 'helpers/layoutHelpers';

export default function PrinterHero(props) {

    const printer = endpointIdByFriendlyName(props.name)

    return (
        <PrinterSummary hideOff endpointId={printer} onClick={ ()=> selectPage('ComputerPage') } />
    );
}
