import React, { useState, useEffect } from 'react';
import useUserStore from 'store/userStore'
import useRegisterStore from 'store/registerStore'
import { discovery, refreshDirectives, refreshProperties } from 'store/directive'
import { Button, Group, Text } from '@mantine/core'
import { CloudOff } from 'react-feather';

import useStream from 'store/useStream'
import storeUpdater from 'store/storeUpdater'
import { useDidUpdate } from '@mantine/hooks';

export default function SofaFrame(props) {

    const refreshUser = useUserStore(state => state.refresh)
    const [ refreshed, setRefreshed ] = useState(false) // This should actually leverage the store and stream state instead
    const { streamConnected, streamStatus, streamLabel, url } = useStream(storeUpdater)
    const [ details, setDetails] = useState(false)
    const setRegisterReady = useRegisterStore( state => state.setReady )
    const refreshRegistered = useRegisterStore( state => state.refresh )

    useEffect(() => {
        refreshDirectives()
        refreshProperties()
        discovery()
        refreshUser()
        setRefreshed(true)
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


    if (!streamConnected || streamStatus !== 1 ) {
        return  <Group direction="column" style={{ maxWidth: 320, margin: "0 auto" }}>
                    <Button color={ streamStatus===0 ? undefined : "red"} 
                            fullWidth 
                            variant={'light'} 
                            leftIcon={<CloudOff size={20} /> }
                            loading 
                            onClick={() => setDetails(!details)}
                    >
                        {streamLabel} {streamStatus}
                    </Button>
                    { details &&
                        <>
                            <Text size="xs" lineClamp={1}>{streamLabel}</Text>
                            <Text size="xs" lineClamp={1}>{url}</Text>
                            <Text size="xs" lineClamp={1}>{streamStatus}</Text>
                            <Text size="xs" lineClamp={1}>{refreshed}</Text>
                        </>
                    }
                </Group>
    }

    return (
        <div style={{height: 0}} />
    );
}
