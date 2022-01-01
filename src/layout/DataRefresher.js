import React, { useState, useEffect } from 'react';
import useUserStore from 'store/userStore'
import { discovery, refreshDirectives, refreshProperties } from 'store/directive'
import { Button } from '@mantine/core'
import { CloudOff } from 'react-feather';

import useStream from 'store/useStream'
import storeUpdater from 'store/storeUpdater'

export default function SofaFrame(props) {

    const refreshUser = useUserStore(state => state.refresh)
    const [ refreshed, setRefreshed ] = useState(false) // This should actually leverage the store and stream state instead
    const { streamConnected, streamStatus} = useStream(storeUpdater)

    useEffect(() => {
        refreshDirectives()
        refreshProperties()
        discovery()
        refreshUser()
        setRefreshed(true)
        // eslint-disable-next-line 
    }, [])

    if (!streamConnected || streamStatus !== 1 ) {
        return <Button fullWidth variant={'light'} leftIcon={<CloudOff size={20} />} loading >
                    Reconnecting {streamStatus} { refreshed}
                </Button>
    }

    return (
        <div style={{height: 0}} />
    );
}
