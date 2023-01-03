import React from 'react';
import { Button, } from '@mantine/core'
import useRangeValue from 'endpoint-model/property/rangeValue/useRangeValue'
import { IconDeviceSpeaker } from '@tabler/icons';

const JukeboxSpeakerButton = props => {
    
    const { rangeValue: activeSpeakerCount } = useRangeValue(props.endpointId, 'Speaker.Count')

    return (
        <Button size="lg" variant={ activeSpeakerCount  ? "filled" : "default" } compact leftIcon={<IconDeviceSpeaker size={16} />} onClick={props.onClick}>
            {activeSpeakerCount}
        </Button>
    );
}

export default JukeboxSpeakerButton

