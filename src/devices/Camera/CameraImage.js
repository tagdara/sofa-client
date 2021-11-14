import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import CircularProgress from '@mui/material/CircularProgress';

import { useInterval } from 'components/useInterval';
import { register, unregister, deviceByEndpointId } from 'store/deviceHelpers'
import { directive } from 'store/directive'
//import { checkToken } from 'store/userHelpers'
import useDeviceStateStore from 'store/deviceStateStore'

const useStyles = makeStyles(theme => {
    
    return {    
        im: {
            width: "100%",
            height: "auto",
            borderRadius: 8,
            display: "flex",
        },
        spinner: {
            //color: theme.palette.layer.itemHighlight,
            position: "absolute",
            margin: "auto",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        unreachable: {
            position: "absolute",
            margin: "auto",
            top: 4,
            left: 4,
            right: 0,
            bottom: 0,
        },
    }
});

const CameraImage = props => {

    const classes = useStyles();
    //const { checkAuthentication } = useContext(NetworkContext);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [updateUri, setupdateUri] = useState("");
    const image = useRef(null);
    const holder = useRef(null);
    const [imageUri, setImageUri] = useState(undefined)

    const device = deviceByEndpointId(props.endpointId)
    const cameraState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const name = device ? device.name : ""

    useEffect(() => {
        setImageUri(undefined)
        setupdateUri(undefined) 
        register(props.endpointId, "image-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "image-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])  


    const unreachable = cameraState && cameraState.EndpointHealth ? cameraState.EndpointHealth.connectivity.value.value !== "OK" : true

    useEffect(()=> {

        function getImageUriFromPayload(data) {
            try {
                var newUri = data.payload.imageUri
                setImageUri(newUri)
            }
            catch(e) {
                console.log('Improper response from InitializeCameraStreams', data)
            }
        }

        if ((!unreachable) && (props.endpointId)) { 
            // This should get the static image URI without starting streams unnecessarily
            directive(props.endpointId, "CameraStreamController", "InitializeCameraStreams",{ "cameraStreams": [] })
                .then(response =>{ getImageUriFromPayload(response) } )
        } 
    // eslint-disable-next-line 
    }, [ props.endpointId, unreachable ]);

    useInterval(() => {
        if (imageUri && !props.disabled) {
            setupdateUri(imageUri+"?time="+Date.now())
        }
    }, (imageUri || props.showDialog) ? props.refreshInterval : null);

    function imageFinished() {
        if (!imageLoaded) {
            setImageLoaded(true);
        }
        if (image.current.offsetHeight>0) {
            props.setLowHeight(image.current.offsetHeight)
        }
    }
    
    function imageError(e) {
        console.log('image error', e)
        //checkToken()
        //checkAuthentication().then(res => { console.log('image error.',props.imageUri, e.message,' -  loaded: '+imageLoaded) } )
    }
 
    if (!imageUri || unreachable) {
        return (
            <div className={classes.hidden} style={{minHeight: props.lowHeight}}>
                { cameraState && unreachable ?
                    <span className={classes.unreachable}>Offline</span>
                :
                    <>
                        <span className={classes.unreachable}>{name}</span>
                        <CircularProgress className={classes.spinner} size={50} />
                    </>
                }
            </div>
        )
    }
    
    return (
        <div ref={holder} style={{ minHeight: props.lowHeight }}>
        <img
            ref={image}
            className={classes.im }
            src={updateUri ? updateUri : imageUri+"?date="+Date.now()}
            onError={ (e) => imageError(e) }
            onLoad={ () => imageFinished() }
            onClick={ () => props.openDialog() }
            alt={imageLoaded+" "+props.name+" ("+imageLoaded+")"}
        />
        </div>
    )
}

export default CameraImage;
