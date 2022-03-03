import React, { useEffect } from 'react';
import useUserStore from 'store/userStore'
import useRegisterStore from 'store/registerStore'
import { discovery, refreshDirectives, refreshProperties } from 'store/directive'
import { Button, Group } from '@mantine/core'
import { CloudOff } from 'react-feather';

import useStream from 'store/useStream'
import storeUpdater from 'store/storeUpdater'
import { useDidUpdate } from '@mantine/hooks';

export default function SofaFrame(props) {

    const refreshUser = useUserStore(state => state.refresh)
    const { streamConnected, streamStatus, reconnect } = useStream(storeUpdater)
    const setRegisterReady = useRegisterStore( state => state.setReady )
    const refreshRegistered = useRegisterStore( state => state.refresh )

    useEffect(() => {
        refreshDirectives()
        refreshProperties()
        discovery()
        refreshUser()
        // eslint-disable-next-line 
    }, [])

    useDidUpdate(() => {
        if (streamStatus === 1) {
            console.log('>> sending registration refresh')
            setRegisterReady(true)
            refreshRegistered()
        } else {
            setRegisterReady(false)
        }
    }, [ streamStatus ])

    //<Button color="red" fullWidth variant={'light'} leftIcon={<CloudOff size={20} />} loading >
    //    {streamLabel} { url} {streamStatus} { refreshed }
    //</Button>

    const statusLabel = streamStatus === 0 ? 'connecting' : (streamStatus === 2 ? 'closed' : 'not ready')


    if (!streamConnected || streamStatus !== 1 ) {
        return  <Group direction="column" style={{ maxWidth: 320, margin: "0 auto" }}>
                    <Button color={ streamStatus === 0 ? undefined : "red"} 
                            fullWidth 
                            variant={'light'} 
                            leftIcon={<CloudOff size={20} /> }
                            loading={ streamStatus === 0}
                            onClick={reconnect}
                    >
                        Data stream is {statusLabel}
                    </Button>
                </Group>
    }

    return (
        <div style={{height: 0}} />
    );
}
