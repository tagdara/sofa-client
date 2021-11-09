import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import CardBase from 'components/CardBase';

const useStyles = makeStyles(theme => {
    
    return {    
        nextbutton: {
            position: "absolute",
            top: "40%",
            right: 8,
        },
        prevbutton: {
            position: "absolute",
            top: "40%",
            left: 8,
        },
        gridbutton: {
            position: "absolute",
            left: 8,
            bottom: 8,
        },
        newgridbutton: {
            position: "absolute",
            right: 8,
            bottom: 8,
        },
        newVideoButton: {
            position: "absolute",
            right: 8,
            top: 8,
        },
        im: {
            width: "100%",
            height: "auto",
            borderRadius: 4,
            display: "flex",
            clipPath: "inset(10px 20px 30px 40px)",
        },
        hiddenimage: {
            height: 0,
            display: "none",
        },
        hidden: {
            borderRadius: 4,
            position: "relative",
            width: "100%",
            paddingTop: '56.25%', // 16:9
            boxSizing: "border-box",
        },
        spinner: {
            color: theme.palette.layer.itemHighlight,
            position: "absolute",
            margin: "auto",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        sizerDiv: {
            width: "100%",
            height: 0,
            maxHeight: 0,
        }
    }
});

function useInterval(callback, delay) {
    
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }

    }, [delay]);
}

export default function Laundry(props) {

    const classes = useStyles();
    const refreshInterval=5000;
    const [imageUri,setImageUri] = useState("")
    const [ready, setReady] = useState(false)
    const holder = useRef(null);
    const [lowHeight,setLowHeight]= useState(210)
    const sizerRef = useRef(false)    
    const canvas = useRef(null);

    useEffect(() => { 
        
        try {
            if (sizerRef.current.parentNode.offsetWidth>0) { setLowHeight(Math.ceiling(sizerRef.current.parentNode.offsetWidth * 0.66)) }
        } 
        catch {
            // offsetWidth is not always available on first check
        }

    // eslint-disable-next-line 
    }, [ sizerRef.current ] )
    

    useInterval(() => {
        if (imageUri) {
            getImagePart(imageUri+"?time="+Date.now())
        }
    }, (imageUri) ? refreshInterval : null);

    
    useEffect(()=> {
        
        function updateUrlUri(data) {
            if (data.payload) {
                setImageUri(data.payload.imageUri)
            } else {
                console.log('no payload in data',data)
            }
            getImagePart(data.payload.imageUri+"?time="+Date.now())
        }
 
        if ((props.camera) && (ready!==props.camera)) { 
            setReady(props.camera)
            //props.camera.CameraStreamController.directive("InitializeCameraStreams", 
            console.log('dir', props.directive)
            // This should get the static image URI without starting streams unnecessarily
            props.directive(props.camera, "CameraStreamController", "InitializeCameraStreams",{ "cameraStreams": [] })
                .then(response => { console.log(response); updateUrlUri(response) } )
        } 
    // eslint-disable-next-line 
    }, [props.camera, ready]);

    function getImagePart(newUrl) {
        
        var image = new Image();
        image.onload = () => {
            var ctx = canvas.current.getContext('2d');
            //ctx.drawImage(image, 700, 65, 400, 80, 0, 0, 400, 80);
            //ctx.drawImage(image, 800, 720, 270, 70, 0, 80, 400, 80);
            ctx.drawImage(image, 885, 83, 38, 51, 0, 0, 76, 102);
            ctx.drawImage(image, 943, 735, 120, 35, 100, 0, 240,70);
        }
        image.src = newUrl
    }
    
    return (
        <CardBase noPad={true}>
            <div className={ classes.sizerDiv} ref={sizerRef} />
                { imageUri && 
                    <div ref={holder} style={{minHeight: `${lowHeight}`}}>
                        <canvas ref={canvas} width={400} height={200}> </canvas>
                    </div>
                }
        </CardBase>
    );
}
