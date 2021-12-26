import React, { useEffect } from 'react';
import useUserStore from 'store/userStore'
import { discovery, refreshDirectives, refreshProperties } from 'store/directive'

export default function SofaFrame(props) {

    const refreshUser = useUserStore(state => state.refresh)
    
    useEffect(() => {
        refreshDirectives()
        refreshProperties()
        discovery()
        refreshUser()
        // eslint-disable-next-line 
    }, [])

    return (
        <div style={{height: 0}} />
    );
}
