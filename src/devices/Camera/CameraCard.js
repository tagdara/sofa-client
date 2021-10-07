import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import CardBase from 'components/CardBase';

const useStyles = makeStyles(theme => {
    
    return {    
        sizerDiv: {
            width: "100%",
            height: 0,
            maxHeight: 0,
        }
    }
});

const CameraCard = props => {

    const classes = useStyles();
    const sizerRef = useRef(false)    

    useEffect(() => { 
        try {
            if (sizerRef.current.parentNode.offsetWidth>0) { 
                props.setLowHeight(Math.ceiling(sizerRef.current.parentNode.offsetWidth * 0.56))  // Seems to be aspect for unifi
            }
        } 
        catch {
            // offsetWidth is not always available on first check
        }
    // eslint-disable-next-line 
    }, [ sizerRef.current ] )

    return (
        <CardBase noPad={true}>
            <div className={ classes.sizerDiv} ref={sizerRef} />
            { props.children }
        </CardBase>
    );
}

export default CameraCard;