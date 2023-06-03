import React from 'react';
import { Button, Text } from '@mantine/core'
import useRangeValue from 'endpoint-model/property/rangeValue/useRangeValue'
import { IconDeviceSpeaker } from '@tabler/icons';

const JukeboxSpeakerButton = props => {
    
    const { rangeValue: activeSpeakerCount } = useRangeValue(props.endpointId, 'Speaker.Count')

    return (
        <Button size="lg" variant={ activeSpeakerCount  ? "light" : "default" } compact leftIcon={<IconDeviceSpeaker size={16} />} onClick={props.onClick}>
            <Text size={activeSpeakerCount ? "md" : "sm"}>
                {activeSpeakerCount ? activeSpeakerCount : "Off"}
            </Text>
        </Button>
    );
}

export default JukeboxSpeakerButton

