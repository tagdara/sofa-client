import React, { useState } from 'react';
import CardLine from 'components/CardLine'
import {  Collapse, Group } from '@mantine/core'
import useApp from 'device-model/property/app/useApp'
import useArt from 'device-model/property/art/useArt'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import { SiAppletv as AppleTvIcon } from "react-icons/si";

const AppleTV = props => {
  
    const [ showDetail, setShowDetail ] = useState(false);
    const { app: appName } = useApp(props.endpointId)
    const { art } = useArt(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const on = true


    return (
            <Group direction="column" grow>
                <CardLine   avatarSrc={ art ? art : undefined }
                            avatar={ art ? undefined :<AppleTvIcon size={24} /> }
                            primary={ name }
                            secondary = { appName }
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
