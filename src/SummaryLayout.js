import React, { useEffect, useContext, useRef } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { makeStyles } from '@material-ui/styles';

import GridSection from 'components/GridSection';
import GridItem from 'components/GridItem';
import Typography from '@material-ui/core/Typography';

import AvSummary from './AvSummary'
import LightSummary from './LightSummary'
import SecuritySummary from './SecuritySummary'
import SystemLaunch from './SystemLaunch'

const useStyles = makeStyles(theme => {
    return {        
        label: {
            padding: 16,  
            width: "80%",
            minHeight: 128,
        },
        hover: {
            "&:hover" : {
                backgroundColor: theme.palette.primary.light,
            },
        }
    }
})

export default function SummaryLayout(props) {

    const { setMasterButtonState, applyHomePage, applyLayoutCard} = useRef(useContext(LayoutContext)).current;
    const classes = useStyles();

    useEffect(() => {
        setMasterButtonState('System')
    }, [ setMasterButtonState ] );    
    
    return (    
        <GridSection name={"Summary"} >
            <GridItem hover={true} xs={6} flex={true} onClick={() => applyHomePage('Audio Video')}>
                <Typography className={classes.label} variant="h5">Audio&nbsp;& Video</Typography>
                <AvSummary />
            </GridItem>

            <GridItem hover={true} xs={6} flex={true} onClick={() => applyHomePage('Lights and Comfort')}>
                <Typography className={classes.label} variant="h5">Lights&nbsp;& Comfort</Typography>
                <LightSummary />
            </GridItem>

            <GridItem hover={true} xs={6} flex={true} onClick={() =>  applyHomePage('Security')}>
                <Typography className={classes.label} variant="h5">Security</Typography>
                <SecuritySummary />
            </GridItem>

            <GridItem hover={true} xs={6} onClick={ () => applyLayoutCard('SystemLayout') }>
                <Typography className={classes.label} variant="h5">System&nbsp;& Automation</Typography>
                <SystemLaunch />
            </GridItem>
        </GridSection>
    )
};