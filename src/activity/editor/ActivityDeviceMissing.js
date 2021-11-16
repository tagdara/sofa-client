import React from 'react';
import { makeStyles } from '@mui/styles';

import CropFreeIcon from '@mui/icons-material/CropFree';
import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'

const useStyles = makeStyles({

    deviceButton: {
        width: "100%",
        height: 56,
        borderRadius: 4,
    },
    deviceLine: {
        display: "flex",
        height: 64,
        alignItems: "center",
    },
    typeLine: {
        fontSize: 10,
    },
    primary: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
});

const ActivityDeviceMissing = props => {

    const classes = useStyles();

    return (
        <CardLine onClick={props.onClick}  >
            <CardLineIcon>
                <CropFreeIcon /> 
            </CardLineIcon>
            <CardLineText   classes={{ primary: classes.primary, secondary: classes.typeLine}} 
                            primary={ props.endpointId } 
                            secondary={ "Device missing" } 
            />
        </CardLine>
    )
}

export default ActivityDeviceMissing
