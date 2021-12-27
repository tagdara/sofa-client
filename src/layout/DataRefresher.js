import React, { useState, useEffect } from 'react';
import useUserStore from 'store/userStore'
import { discovery, refreshDirectives, refreshProperties } from 'store/directive'
import { Button } from '@mantine/core'

export default function SofaFrame(props) {

    const refreshUser = useUserStore(state => state.refresh)
    const [refreshed, setRefreshed ] = useState(false) // This should actually leverage the store and stream state instead
    
    useEffect(() => {
        refreshDirectives()
        refreshProperties()
        discovery()
        refreshUser()
        setRefreshed(true)
        // eslint-disable-next-line 
    }, [])

    if (!refreshed) {
        return <Button fullWidth variant={'light'}>
                    Refreshing Data
                </Button>
    }

    return (
        <div style={{height: 0}} />
    );
}
