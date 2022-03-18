import React from 'react';
import PrinterSummary from 'devices/Computer/PrinterSummary'
import { endpointIdByFriendlyName } from 'store/deviceHelpers';

export default function PrinterHero(props) {

    const printer = endpointIdByFriendlyName(props.name)

    return (
        <PrinterSummary hideOff endpointId={printer} />
    );
}
