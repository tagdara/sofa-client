import React, { useState, useEffect } from 'react';
import useUserStore from 'store/userStore'
import { discovery, refreshDirectives, refreshProperties } from 'store/directive'
import { Button, Group } from '@mantine/core'
import { CloudOff } from 'react-feather';

import useStream from 'store/useStream'
import storeUpdater from 'store/storeUpdater'

export default function SofaFrame(props) {

    const refreshUser = useUserStore(state => state.refresh)
    const [ refreshed, setRefreshed ] = useState(false) // This should actually leverage the store and stream state instead
    const { streamConnected, streamStatus, streamLabel } = useStream(storeUpdater)

    useEffect(() => {
        refreshDirectives()
        refreshProperties()
        discovery()
        refreshUser()
        setRefreshed(true)
        // eslint-disable-next-line 
    }, [])

    if (!streamConnected || streamStatus !== 1 ) {
        return  <Group>
                    <Button color="red" fullWidth variant={'light'} leftIcon={<CloudOff size={20} />} loading >
                        {streamLabel} {streamStatus} { refreshed }
                    </Button>
                </Group>
    }

    return (
        <div style={{height: 0}} />
    );
}
