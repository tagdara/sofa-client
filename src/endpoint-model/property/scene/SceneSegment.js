import React from 'react';
import useScene from 'endpoint-model/property/scene/useScene'
import SegmentMenu from 'components/SegmentMenu'

export default function SceneSegment(props) {

    const { sceneLabel, selections, setScene} = useScene(props.endpointId, props.value, props.directive)

    return (
        <SegmentMenu size={props.size} value={ sceneLabel } selections={selections} select={setScene} />
    );
}

