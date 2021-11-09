import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { DeviceContext } from 'context/DeviceContext';
import { LayoutContext } from 'layout/LayoutProvider';

import {makeStyles, withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import GridItem from "components/GridItem"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

import Button from '@mui/material/Button';

import moment from 'moment';
import 'moment-timezone';
import GridSection from 'components/GridSection';
import AutomationCondition from './automation/AutomationCondition';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Text } from 'recharts';

const useStyles = makeStyles({
    
    dateEntry: {
        paddingRight: 8,
        width: "50%",
    },
    timeEntry: {
        width: "50%",
    },
    interval: {
        marginRight: 16,
    }
});
  
const BootstrapInput = withStyles(theme => ({
    input: {
        minWidth: '100px',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);  

export default function DeviceHistory(props) {
    
    const classes = useStyles();
    const limit=2000
    const intervals=["1s", "1m", "5m", "10m", "30m", "1h", "4h", "6h"]
    const [ item, setItem]=useState(undefined)
    const [ groupBy, setGroupBy] = useState('1h')
    const [ yAxisType, setYAxisType] = useState('number')
    const [ start, setStart] = useState(moment().subtract(1,'day'));
    const [ startDateEntry, setStartDateEntry] = useState(start.format('YYYY-MM-DD'))
    const [ startTimeEntry, setStartTimeEntry] = useState(start.format('HH:mm:ss'))
    const [ end, setEnd] = useState(moment())
    const [ endDateEntry, setEndDateEntry] = useState(end.format('YYYY-MM-DD'))
    const [ endTimeEntry, setEndTimeEntry] = useState(end.format('HH:mm:ss'))

    const [history, setHistory] = useState([])
    const { isMobile } = useContext(LayoutContext);
    const { deviceByEndpointId, getControllerProperties, historyQuery } = useContext(DeviceContext);
    const tz = moment.tz.guess();
    const chartwidth=window.innerWidth > 1400 ? 1400 : window.innerWidth
    const chartheight=chartwidth /2 > 500 ? 500 : chartwidth / 2
    
    //useEffect(() => { 
    //    console.log(history)
    //}, [history] )

    useEffect(() => { 
        var x=moment(startDateEntry+" "+startTimeEntry)
        setStart(x)
    }, [startTimeEntry, startDateEntry] )

    useEffect(() => { 
        var x=moment(endDateEntry+" "+endTimeEntry)
        setEnd(x)
    }, [endTimeEntry, endDateEntry] )
    
    function searchReady() {
        try {
            if (start!==undefined && end!==undefined && (item.operator==='Any' || item.value!==undefined) && item.propertyName!==undefined) {
                return true
            }
        } 
        catch {}
        return false
    }

    
    function manualSearch(start, end) {
        var qry=queryBuild()
        try {
            if (item.value[item.propertyName].hasOwnProperty('value')) {
                if (typeof(item.value[item.propertyName].value)==='number') {
                    setYAxisType('number') 
                } else {
                    setYAxisType('category') 
                }
            } else {
                if (typeof(item.value[item.propertyName])==='number') {
                    setYAxisType('number') 
                } else {
                    setYAxisType('category') 
                }
            }
        }
        catch { setYAxisType('category') }
        console.log('new query', qry)
        //var qry="SELECT ROUND(MEAN(temperature)) FROM controller_property WHERE time > '"+start.format()+"' AND temperature > -30 AND time < '"+end.format()+"' AND endpoint='"+device.endpointId+"' GROUP BY time("+groupBy+") ORDER BY time ASC"
        historyQuery(qry).then(result=> setHistory(JSON.parse(result)))
    }

    function deepvalue() {
        try {
            if (item.value[item.propertyName].hasOwnProperty('value')) {
                return item.value[item.propertyName].value
            } 
            return item.value[item.propertyName]
        }
        catch { return undefined }
    }
    
    function queryBuild() {
        if (item===undefined) { return undefined }
        var select="SELECT "
        if (typeof(deepvalue())==='number' || item.operator==='Any') {
            select=select+"ROUND(MEAN("+item.propertyName+")) "
        } else {
            select=select+item.propertyName+" "
        }
        
        var qfrom="as datafield FROM controller_property WHERE time > '"+start.format()+"' AND time < '"+end.format()+"' "
        qfrom=qfrom+"AND endpoint='"+item.endpointId+"' "
        if (typeof(deepvalue())==='number' && item.operator!=='Any') { 
            qfrom=qfrom+'AND '+item.propertyName
            if (item.operator) {
                qfrom=qfrom+item.operator
            } else {
                qfrom=qfrom+"="
            }
            if (typeof(deepvalue())==='number') {
                qfrom=qfrom+deepvalue()+" "
            } else {
                qfrom=qfrom+"'"+deepvalue()+"' "
            }
        }
        var qgroup=""
        console.log('deepv',deepvalue(), typeof(deepvalue()))
        if (typeof(deepvalue())==='number' || item.operator==='Any') {
            qgroup="GROUP BY time("+groupBy+") fill(previous)"
        }
        var qorder="ORDER BY time ASC LIMIT "+limit
        
        return select+qfrom+qgroup+qorder
        
    }

    const CustomizedAxisTick = props => {
        // eslint-disable-next-line react/prop-types
        const { x, y, payload } = props;
        
        return (<>
            <Text x={x} y={y + 8} fill="#777" fontSize={10} textAnchor="middle">{moment.unix(payload.value).tz(tz).format('MMM D')}</Text>
            <Text x={x} y={y + 20} fill="#777" fontSize={10} textAnchor="middle">{moment.unix(payload.value).tz(tz).format('h:mma')}</Text>
            </>
        )
    };  

    function selectDevice(index, newdevice) {
        console.log('updated item',newdevice)
        setItem({...newdevice})
    }

    
    return (    
        <GridSection>
            <Grid container>
                <GridItem xs={12} >
                    <AutomationCondition    index={0} item={item} save={selectDevice} anyOp={true}
                                            device={item ? deviceByEndpointId(item.endpointId) : undefined } 
                                            controllerProperties={ item ? getControllerProperties(item.endpointId)  : undefined }
                                            />
                </GridItem>

                <GridItem xs={isMobile ? 12 : 4} >
                    <ListItem>
                        <TextField className={classes.dateEntry} variant="outlined" onChange={(e) => setStartDateEntry(e.target.value) }
                            id="start" label="Start" type="date"
                            value={startDateEntry}
                            InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />
                        <TextField className={classes.timeEntry} variant="outlined" onChange={(e) => setStartTimeEntry(e.target.value) }
                            id="time" label="Time" type="time"
                            value={startTimeEntry}
                            InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />
                        </ListItem>
                </GridItem>
                
                <GridItem xs={isMobile ? 12 : 4} >
                    <ListItem>
                        <TextField className={classes.dateEntry} variant="outlined" onChange={(e) => setEndDateEntry(e.target.value) } 
                            id="end" label="End" type="date" 
                            value={endDateEntry}
                            InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />
                        <TextField className={classes.timeEntry} variant="outlined" onChange={(e) => setEndTimeEntry(e.target.value)  }
                            id="endtime" label="Time" type="time"
                            value={endTimeEntry}
                            InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />
                    </ListItem>
                </GridItem>
                
                <GridItem xs={isMobile ? 12 : 4} >
                    <ListItem>
                        <Select className={classes.interval} label="Start" value={groupBy} onChange={(e) => setGroupBy(e.target.value)} input={<BootstrapInput name="interval" id="interval" />} >
                        { intervals.map( iv => 
                            <MenuItem key={ iv } value={iv}>{iv}</MenuItem>
                        )}
                        </Select>
                        <Button disabled={!searchReady()} color={"primary"} variant="contained" onClick={()=>manualSearch(start, end)}>Go</Button>
                    </ListItem>
                </GridItem>
            </Grid>


                { (history && history.length>0) &&
                    <LineChart
                        width={chartwidth} height={chartheight} data={history} 
                        margin={{ top: 16, right: 16, left: 8, bottom: 16, }} >
                        <CartesianGrid vertical={true} strokeDasharray="1 5"/>
                        <XAxis dataKey="time"  scale={'time'} type="number" domain={['dataMin', 'dataMax']} 
                                tick={<CustomizedAxisTick />} />
                        <YAxis type={yAxisType} width={32} domain={['dataMin', 'dataMax']} />
                        <Line connectNulls type={ yAxisType==="number" ? "monotone" : "stepAfter" } dataKey="datafield" stroke="#ff7300" dot={true} strokeWidth={2} />
                    </LineChart>
                }
        </GridSection>
    )

};
