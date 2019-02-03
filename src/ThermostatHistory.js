import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import GridBreak from './GridBreak';
import GridItem from './GridItem';

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

    const dataArr = history.map((d)=> {
        return {x: d.time, y: d.temperature}
    });
    
    useEffect(() => {
        getHistory()
    }, []);   
    
    function getHistory() {
        
        var qry="select temperature from controller_property where endpoint='elk:zone:14' ORDER BY time DESC LIMIT 250"
        
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
        console.log(data)
        fd = data.map((d)=> {
            return {x: new Date(d.time).getTime(), y: d.temperature}
        });
        setHistory(fd)
        console.log(fd)
        
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Thermostats"} />
            <GridItem xs={12}>

            <XYPlot xType="time" width={800} height={500} yDomain={[50, 80]} >
                  <XAxis title="X Axis" />
                  <YAxis title="Y Axis" />
                  <LineSeries curve={'curveMonotoneX'}
                    data={history}
                  />
            </XYPlot>
            </GridItem>
        </React.Fragment>
    )

};
