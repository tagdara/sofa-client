import React, { useEffect } from 'react';
import useUserStore from 'user/userStore'
import useRegisterStore from 'endpoint-model/register/registerStore'
import { discovery, refreshDirectives, refreshProperties } from 'endpoint-model/directive/directive'
import { Button, Stack } from '@mantine/core'
import { IconCloudOff } from '@tabler/icons';
import useStream from 'network/useStream'
import storeUpdater from 'endpoint-model/storeUpdater'
import { useDidUpdate } from '@mantine/hooks';

export default function DataRefresher(props) {

    const refreshUser = useUserStore(state => state.refresh)
    const { streamConnected, streamStatus, reconnect } = useStream(storeUpdater)
    const setRegisterReady = useRegisterStore( state => state.setReady )
    const registerReady = useRegisterStore( state => state.ready )
    const refreshRegistered = useRegisterStore( state => state.refresh )

    useEffect(() => {
        refreshDirectives()
        refreshProperties()
        discovery()
        refreshUser()
        // eslint-disable-next-line 
    }, [])

    useEffect (() => {
        const watchVisibilityChanges = () => {
            if (!document.hidden) {
                console.log('refreshing on visibility')
                refreshRegistered()
            }
        }
        console.log('registering visibility watcher')
        document.addEventListener("visibilitychange", watchVisibilityChanges)
        return () => document.removeEventListener ("visibilitychange", watchVisibilityChanges)
	// eslint-disable-next-line 
    }, [])

    useDidUpdate(() => {
        if (streamStatus === 1) {
            console.log('>> sending registration refresh')
            setRegisterReady(true)
        } else {
            setRegisterReady(false)
        }
    }, [ streamStatus ])

    useDidUpdate(() => {
        if (registerReady) {
            console.log('>> sending registration refresh', registerReady)
            refreshRegistered()
        } 
    }, [ registerReady ])   

    const statusLabel = streamStatus === 0 ? 'connecting' : (streamStatus === 2 ? 'closed' : 'not ready')

    if (!streamConnected || streamStatus !== 1 ) {
        return  <Stack style={{ maxWidth: 320, margin: "0 auto" }}>
                    <Button color={ streamStatus === 0 ? undefined : "red"} 
                            fullWidth 
                            variant={'light'} 
                            leftIcon={<IconCloudOff size={20} /> }
                            loading={ streamStatus === 0}
                            onClick={reconnect}
                    >
                        Data stream is {statusLabel}
                    </Button>
                </Stack>
    }

    return (
        <div style={{height: 0}} />
    );
}
