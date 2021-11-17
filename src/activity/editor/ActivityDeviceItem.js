import React from 'react';
import { makeStyles } from '@mui/styles';

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'
import DeviceIcon from 'components/DeviceIcon';

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

const ActivityDeviceItem = props => {

    const classes = useStyles();
    const name = props.device.friendlyName
    const category = props.device.displayCategories[0]

    var camelSentence = (str) => {
        return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
        {
            return chr.toUpperCase();
        });
    }

    return (
        <CardLine onClick={props.onClick} inLine={true}  >
            <CardLineIcon>
                <DeviceIcon name={ category } />
            </CardLineIcon>
            <CardLineText   classes={{ primary: classes.primary, secondary: classes.typeLine}} 
                            primary={ name } 
                            secondary={ camelSentence(category) } 
            />
        </CardLine>
    )
}

export default ActivityDeviceItem
