import React from 'react';
import useSceneCurrent from 'endpoint-model/property/mode/SceneCurrent/useSceneCurrent'
import SegmentMenu from 'layout/components/SegmentMenu'

export default function SceneSegment(props) {

    const { sceneFriendlyName, selections, setScene} = useSceneCurrent(props.endpointId, props.value, props.directive)

    return (
        <SegmentMenu size={props.size} value={ sceneFriendlyName } selections={selections} select={setScene} />
    );
}

