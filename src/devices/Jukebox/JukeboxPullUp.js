import React from 'react';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import PullUpCard from 'layout/pullup/PullUpCard'
import { Button, Divider, Stack } from '@mantine/core'
import SpeakerList from 'devices/Speaker/SpeakerList';
import PowerStateLine from 'endpoint-model/property/powerState/PowerStateLine'
import JukeboxPlayer from 'devices/Jukebox/JukeboxPlayer'

const JukeboxPullUp = props => {

    // const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const excludeSpeakers = ['mca:mca-zone-1', 'mca:mca-zone-2', 'jukebox', 'sonos:player:RINCON_B8E9378E1E8001400' ]
    const ampOutlet = "kasa:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E01"

    function openJukebox() {
        var newurl="https://jukebox.dayton.tech"
        var safariWindow = window.open();
        safariWindow.location.href = newurl
    }

    return (
        <PullUpCard name={name} title={name}  >
            <Stack spacing="xl">
                <JukeboxPlayer
                    endpointId={props.endpointId}
                    buttons={
                      <Button variant="light"
                        onClick={openJukebox}
                        radius="xl">
                        Open Jukebox
                      </Button>
                    }
                />
                <SpeakerList exclude={excludeSpeakers} />
                <Divider />
                <PowerStateLine icon label="Amp Power" endpointId={ampOutlet} />
            </Stack>
        </PullUpCard>
    );
}

export default JukeboxPullUp;
