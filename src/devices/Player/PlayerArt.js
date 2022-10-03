import React from 'react';
import { Image } from '@mantine/core'
import useTokenImage from 'helpers/useTokenImage'
import useMediaReporter from 'endpoint-model/controller/MediaReporter/useMediaReporter'
import { IconMusic } from '@tabler/icons';

export default function PlayerArtOverlay(props) {
    
    const { art, title } = useMediaReporter(props.endpointId)
    const artOrDefault = art || ""
    const titleLabel = title || "Jukebox is idle"
    const { localImageUrl, imageLoaded } = useTokenImage(artOrDefault)
    const placeholder = props.placeholder || <IconMusic style={{ aspectRatio: 1, height: "100%", width: 480, maxWidth: "30%" }} />

    return ( 
        <Image 
            radius="sm"
            style={{ display: "flex", flexGrow: 1, maxWidth: "30%" }}
            withPlaceholder={!imageLoaded}
            placeholder={placeholder}
            src={ imageLoaded ? localImageUrl : null }
            title={ titleLabel }
            alt={ titleLabel }
        />
    );
}

