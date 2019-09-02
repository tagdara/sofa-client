import React from 'react';
import { makeStyles } from '@material-ui/styles';

import AutomationTitle from "./automationTitle"
import AutomationDetails from "./automationDetails"
import GridSection from '../GridSection';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ToggleButton from '../ToggleButton'

const useStyles = makeStyles({
    
    root: {
        alignItems: "flex-end",
        padding: "16px 16px 0px 16px !important",
        height: 64,
        display: "flex",
    },
    label: {
        display: "flex",
        flexGrow:1,
    }
});

export default function AutomationHeader(props) {

    const classes = useStyles();

    return (    
        <GridSection name={"Automation"} >
            <AutomationTitle name={props.name} save={props.save} >
                <ToggleButton buttonState={props.favorite} onClick={ () => props.saveFavorite(!props.favorite) }>
                    <FavoriteIcon fontSize="small" />
                </ToggleButton>
            </AutomationTitle>
            <AutomationDetails automation={props.automation} name={props.name} sendAlexaCommand={props.sendAlexaCommand} />
        </GridSection>
    )

};
