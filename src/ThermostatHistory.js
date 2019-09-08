import React from 'react';
import { useState, useEffect } from 'react';

import moment from 'moment';
import 'moment-timezone';
import GridSection from './GridSection';

import {XYPlot, XAxis, YAxis, VerticalGridLines, LineSeries} from 'react-vis';

export default function ThermostatHistory(props) {

    const [history, setHistory] = useState([])
    
    useEffect(() => {
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

        getHistory()
    }, [props.days,props.device.endpointId]);   
    
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
