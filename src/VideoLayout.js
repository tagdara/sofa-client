import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import GridItem from './GridItem';

const useStyles = makeStyles({
    
    stream: {
        width: "100%",
        height: "auto",
        borderRadius: 4,
    },
 
});

export default function CameraLayout(props) {

    const [cameras, setCameraList] = useState({});
    const classes = useStyles();
    
    useEffect(() => {
        console.log(video)
        if(Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource('https://home.dayton.home:4443/hls/'+props.name+'.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED,function() { video.play(); });
        } 
        //else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        //    video.innerHTML='<source src="https://home.dayton.home:4443/hls/'+props.name+'.m3u8" type="application/x-mpegURL" />'
        //    console.log(video)
        //}
    }, []);
    
    const srcurl="https://home.dayton.home:4443/hls/"+props.name+".m3u8"
    
    return (
        <GridItem wide={true} nopad={true} >
            <video controls muted autoPlay playsInline id="video" className={ classes.stream} >
                <source src={srcurl} type="application/x-mpegURL" />
            </video>
        </GridItem>
    )
}
