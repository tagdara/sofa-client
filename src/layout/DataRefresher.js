import React, { useState, useEffect } from 'react';
import useUserStore from 'store/userStore'
import { discovery, refreshDirectives, refreshProperties } from 'store/directive'
import { Button, Group, Text } from '@mantine/core'
import { CloudOff } from 'react-feather';

import useStream from 'store/useStream'
import storeUpdater from 'store/storeUpdater'

export default function SofaFrame(props) {

    const refreshUser = useUserStore(state => state.refresh)
    const [ refreshed, setRefreshed ] = useState(false) // This should actually leverage the store and stream state instead
    const { streamConnected, streamStatus, streamLabel, url } = useStream(storeUpdater)
    const [ details, setDetails] = useState(false)

    useEffect(() => {
        refreshDirectives()
        refreshProperties()
        discovery()
        refreshUser()
        setRefreshed(true)
        // eslint-disable-next-line 
    }, [])

    //<Button color="red" fullWidth variant={'light'} leftIcon={<CloudOff size={20} />} loading >
    //    {streamLabel} { url} {streamStatus} { refreshed }
    //</Button>


    if (!streamConnected || streamStatus !== 1 ) {
        return  <Group direction="column">
                    <Button color="red" 
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
