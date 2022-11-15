import React from 'react';
import { Image } from '@mantine/core'
import useTokenImage from 'helpers/useTokenImage'
import useMediaReporter from 'endpoint-model/controller/MediaReporter/useMediaReporter'
import { IconMusic } from '@tabler/icons';

export default function PlayerArt(props) {
    
    const { art, title } = useMediaReporter(props.endpointId)
    const artOrDefault = art || ""
    const titleLabel = title || "Jukebox is idle"
    const aspect = props.aspect === "video" ? "16/9" : "1/1"
    const { localImageUrl, imageLoaded } = useTokenImage(artOrDefault)
    const placeholder = props.placeholder || <IconMusic  />

    console.log('imageurl', artOrDefault)

    console.log("artclick", props.artClick)

    return ( 
        <Image 
            style={{ display: "flex", aspectRatio: aspect, width: 480, maxWidth: "30%" }}
            styles={{ figure: { aspectRatio: aspect, display: "flex"}, imageWrapper: { width: "100%" }}}
            withPlaceholder={!imageLoaded}
            placeholder={placeholder}
            src={ imageLoaded ? localImageUrl : null }
            title={ titleLabel }
            alt={"player art" }
            onClick={ (event) => { event.stopPropagation(); props.onClick(event); }}
        />
    );
}

