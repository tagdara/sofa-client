import React, { useState, useRef, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { NetworkContext } from 'network/NetworkProvider';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useInterval } from 'components/useInterval';
import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'

const useStyles = makeStyles(theme => {
    
    return {    
        im: {
            width: "100%",
            height: "auto",
            borderRadius: 4,
            display: "flex",
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

const CameraImage = React.memo(props => {

    const classes = useStyles();
    const { checkAuthentication } = useContext(NetworkContext);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [updateUri, setupdateUri] = useState("");
    const image = useRef(null);
    const holder = useRef(null);
    const [imageUri, setImageUri] = useState(undefined)

    useEffect(() => {
        setImageUri(undefined)
        setupdateUri(undefined)
        props.addEndpointIds("id", props.endpointId, "dialog"+props.endpointId)
        return function cleanup() {
            props.unregisterDevices("dialog"+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [ props.endpointId])  

    const cameraState = props.deviceState && props.deviceState[props.endpointId] ? props.deviceState[props.endpointId] : undefined
    const unreachable = cameraState && cameraState.EndpointHealth ? cameraState.EndpointHealth.connectivity.value.value !== "OK" : true
    const name = props.devices && props.devices[props.endpointId] ? props.devices[props.endpointId].friendlyName : ""

    useEffect(()=> {

        function getImageUriFromPayload(data) {
            try {
                var newUri = data.payload.imageUri
                setImageUri(newUri)
            }
            catch {
                console.log('Improper response from InitializeCameraStreams', data)
            }
        }

        if ((!unreachable) && (props.endpointId)) { 
            // This should get the static image URI without starting streams unnecessarily
            props.directive(props.endpointId, "CameraStreamController", "InitializeCameraStreams",{ "cameraStreams": [] })
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
        checkAuthentication().then(res => { console.log('image error.',props.imageUri, e.message,' -  loaded: '+imageLoaded) } )
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
}, deviceStatesAreEqual);

export default dataFilter(CameraImage);
