import React from 'react';
import { Image } from '@mantine/core'
import useTokenImage from 'helpers/useTokenImage'
import useMusicController from 'endpoint-model/controller/MusicController/useMusicController'
import { IconMusic } from '@tabler/icons';

export default function PlayerArtOverlay(props) {
    
    const { art, title } = useMusicController(props.endpointId)
    const artOrDefault = art || ""
    const titleLabel = title || "Jukebox is idle"
    const { localImageUrl, imageLoaded } = useTokenImage(artOrDefault)

    return ( 
        <Image 
            radius="sm"
            style={{ display: "flex", flexGrow: 1, maxWidth: "30%" }}
            withPlaceholder={!imageLoaded}
            placeholder={<IconMusic style={{ height: "100%", maxWidth: "30%" }} />}
            src={ imageLoaded ? localImageUrl : null }
            title={ titleLabel }
            alt={ titleLabel }
        />
    );
}

