import React, { useState } from 'react';
import CardLine from 'components/CardLine'
import {  Collapse, Stack } from '@mantine/core'
import useApp from 'endpoint-model/property/app/useApp'
import useArt from 'endpoint-model/property/art/useArt'
import useTitle from 'endpoint-model/property/title/useTitle'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import { Apple as AppleTvIcon } from "react-bootstrap-icons"

const AppleTV = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    const { app: appName } = useApp(props.endpointId)
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const { image, art } = useArt(props.endpointId)
    const { title } = useTitle(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 

    return (
            <Stack>
                <CardLine   avatarSrc={ (on && art) ? image : undefined }
                            icon = { (!on || !art) ? <AppleTvIcon size={20} /> : undefined } 
                            primary={ title ? title : appName }
                            secondary = { name }
                            onClick={ () => setShowDetail(!showDetail)}
                            color={ on ? "primary" : undefined }
                >
                </CardLine>
                <Collapse in={showDetail}>
                    
                </Collapse>
            </Stack>
    );
}

export default AppleTV;
