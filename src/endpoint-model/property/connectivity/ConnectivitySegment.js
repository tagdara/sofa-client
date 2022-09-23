import React from 'react';
import SegmentMenu from 'layout/components/SegmentMenu'
import useConnectivity from 'endpoint-model/property/connectivity/useConnectivity'

const ConnectivitySegment = props => {

    const { connectivityLabel, selections, setConnectivity } = useConnectivity(props.endpointId, props.value, props.directive)

    return <SegmentMenu value={connectivityLabel} selections={selections} select={setConnectivity} />

}

export default ConnectivitySegment