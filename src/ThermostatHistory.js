import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import GridSection from './GridSection';

import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

export default function ThermostatHistory(props) {

    const classes = useStyles();
    const [filter, setFilter] = useState('all');
    const isMobile = window.innerWidth <= 800;
    const [history, setHistory] = useState([])
    
    useEffect(() => {
        getHistory()
    }, []);   
    
    function getHistory() {
        var qry="select temperature from controller_property where time > now() - "+props.days+"d AND endpoint='"+props.device.endpointId+"' ORDER BY time DESC LIMIT 250"
        
        fetch("/list/influx/querylist", {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: qry
            })
            .then(res=>res.json())
            .then(res=>formatHistory(res))
    }
    
    function formatHistory(data) {

        var fd=[]
        var lasttemp=data[0].temperature

        fd = data.map((d)=> {
            //return {x: new Date(d.time).toLocaleTimeString(), y: d.temperature}
            
            if ((lasttemp-d.temperature)<5) {
                lasttemp=d.temperature
                return {x: new Date(d.time), y: d.temperature}
            } else {
                return {x: new Date(d.time), y: lasttemp}
            }
        });
        setHistory(fd)
    }
    
    return (    
        <React.Fragment>
            <GridSection name={props.device.friendlyName+" for the last "+props.days+" days"}>
                <XYPlot xType="time" width={800} height={500} yDomain={[50, 85]} >
                    <XAxis title="X Axis" tickTotal={7} tickFormat={v => moment(v).format('MMM D')}/>
                    <YAxis title="Y Axis" />
                    <LineSeries curve={'curveBasis'}
                        data={history}
                    />
                    <VerticalGridLines tickTotal={7} />
                </XYPlot>
            </GridSection>
        </React.Fragment>
    )

};
