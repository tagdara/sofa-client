import React, { useState } from 'react';
import CardLine from 'components/CardLine'
import {  Collapse, Group } from '@mantine/core'
import useApp from 'device-model/property/app/useApp'
import useArt from 'device-model/property/art/useArt'
import useTitle from 'device-model/property/title/useTitle'
import usePowerState from 'device-model/property/powerState/usePowerState'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import { SiAppletv as AppleTvIcon } from "react-icons/si";

const AppleTV = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    const { app: appName } = useApp(props.endpointId)
    const { powerStateBool: on } = usePowerState(props.endpointId)
    const { image, art } = useArt(props.endpointId)
    const { title } = useTitle(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 

    return (
            <Group direction="column" grow>
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
            </Group>
    );
}

export default AppleTV;
