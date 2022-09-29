import React from 'react';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import PullUpCard from 'layout/pullup/PullUpCard'
import { Button, Divider, Stack } from '@mantine/core'
import SpeakerList from 'devices/Speaker/SpeakerList';
import { IconMusic } from '@tabler/icons';
import PowerStateLine from 'endpoint-model/property/powerState/PowerStateLine'

const JukeboxPullUp = props => {

    // const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const excludeSpeakers = ['jukebox', 'sonos:player:RINCON_B8E9378E1E8001400' ]
    const ampOutlet = "kasa:plug:50C7BF3325B0"

    function openJukebox() {
        var newurl="https://jukebox.dayton.tech"
        var safariWindow = window.open();
        safariWindow.location.href = newurl
    }

    return (
        <PullUpCard name={name} title={name}  >
            <Stack spacing="xl">
                <SpeakerList exclude={excludeSpeakers} />
                <Divider />
                <PowerStateLine icon label="Amp Power" endpointId={ampOutlet} />
                <Button 
                    fullWidth 
                    variant="filled" 
                    onClick={openJukebox}
                    leftIcon={<IconMusic size={20} />}
                >
                    Jukebox App
                </Button>
            </Stack>
        </PullUpCard>
    );
}

export default JukeboxPullUp;
