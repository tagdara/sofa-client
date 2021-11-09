import React from 'react';
import { makeStyles } from '@mui/styles';

import ClearIcon from '@mui/icons-material/Clear';
import SofaListItem from "components/SofaListItem";

const useStyles = makeStyles(theme => {
    return {        
        iconSize: {
            height: 24,
            width: 24,
        },
    }
});

const LightRemoveButton = props => {

    const classes = useStyles();

    if (!props.remove) { return null }

    return (
        <SofaListItem primary={"Remove"} avatar={ <ClearIcon /> } avatarClick={() => props.remove(props.endpointId)} className={classes.iconSize} />
    )
}

export default LightRemoveButton;
