import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

import moment from 'moment';
import 'moment-timezone';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Text } from 'recharts';

import { DeviceContext } from 'context/DeviceContext';
import GridSection from 'components/GridSection';
import GridItem from "components/GridItem";


const useStyles = makeStyles({
    
    dateEntry: {
        paddingRight: 8,
        width: "20%",
    },
    timeEntry: {
        paddingRight: 24,
        width: "20%",
    },
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

export default function ThermostatHistory(props) {
    
    const classes = useStyles();
    const [ device, setDevice] = useState(props.device)
    const [ groupBy, setGroupBy] = useState('4h')
    const [ start, setStart] = useState(moment().subtract(4,'day'));
    const [ startDateEntry, setStartDateEntry] = useState(start.format('YYYY-MM-DD'))
    const [ startTimeEntry, setStartTimeEntry] = useState(start.format('HH:mm:ss'))
    const [ end, setEnd] = useState(moment())
    const [ endDateEntry, setEndDateEntry] = useState(end.format('YYYY-MM-DD'))
    const [ endTimeEntry, setEndTimeEntry] = useState(end.format('HH:mm:ss'))

    const [history, setHistory] = useState([])
    const { deviceByEndpointId, devicesByController, historyQuery } = useContext(DeviceContext);
    const thermostats=devicesByController('TemperatureSensor')
    const tz = moment.tz.guess();
    const chartwidth=window.innerWidth > 1400 ? 1400 : window.innerWidth
    const chartheight=chartwidth /2 > 500 ? 500 : chartwidth / 2
    
    console.log(start,end)
    
    useEffect(() => { 
        console.log(history)
    }, [history] )

    useEffect(() => { 
        var x=moment(startDateEntry+" "+startTimeEntry)
        setStart(x)
    }, [startTimeEntry, startDateEntry] )

    useEffect(() => { 
        var x=moment(endDateEntry+" "+endTimeEntry)
        setEnd(x)
    }, [endTimeEntry, endDateEntry] )

    
    function manualSearch(start, end) {
        var qry="SELECT ROUND(MEAN(temperature)) FROM controller_property WHERE time > '"+start.format()+"' AND temperature > -30 AND time < '"+end.format()+"' AND endpoint='"+device.endpointId+"' GROUP BY time("+groupBy+") ORDER BY time ASC"
        historyQuery(qry).then(result=> setHistory(JSON.parse(result)))
    }
    
    function chooseRange(range, unit) {
        var searchstart=moment().subtract(range,unit).format()
        var searchend=moment().format()
        setStart(searchstart)
        setEnd(searchend)
        manualSearch(searchstart, searchend)
    }
    
    const CustomizedAxisTick = props => {
        // eslint-disable-next-line react/prop-types
        const { x, y, payload } = props;
        
        return (<>
            <Text x={x} y={y + 8} fill="#777" fontSize={10} textAnchor="middle">{moment.unix(payload.value).tz(tz).format('MMM D')}</Text>
            <Text x={x} y={y + 20} fill="#777" fontSize={10} textAnchor="middle">{moment.unix(payload.value).tz(tz).format('ha')}</Text>
            </>
        )
    };  
    
    function handleDeviceChange(e) {
        console.log('selected', e.target.value)
        setDevice(deviceByEndpointId(e.target.value))
    }
    
    return (    
        <GridSection name={props.device.friendlyName+" every "+groupBy} >
            <GridItem nopaper={true} xs={12}>
                <ListItem >
                    <Select value={device.endpointId ? device.endpointId : ""} onChange={handleDeviceChange} input={<BootstrapInput name="input" id="input" />} >
                    { thermostats.map( tstat => 
                        <MenuItem key={ tstat.endpointId } value={tstat.endpointId}>{tstat.friendlyName}</MenuItem>
                    )}
                    </Select>
                </ListItem>
                <ListItem>
                    <TextField className={classes.dateEntry} variant="outlined" onChange={(e) => setStartDateEntry(e.target.value) }
                        id="start" label="Start" type="date"
                        value={startDateEntry}
                        InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />
                    <TextField className={classes.timeEntry} variant="outlined" onChange={(e) => setStartTimeEntry(e.target.value) }
                        id="time" label="Time" type="time"
                        value={startTimeEntry}
                        InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />

                    <TextField className={classes.dateEntry} variant="outlined" onChange={(e) => setEndDateEntry(e.target.value) } 
                        id="end" label="End" type="date" 
                        value={endDateEntry}
                        InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />
                    <TextField className={classes.timeEntry} variant="outlined" onChange={(e) => setEndTimeEntry(e.target.value)  }
                        id="endtime" label="Time" type="time"
                        value={endTimeEntry}
                        InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, style: {padding: 10 } }}  />


                <Button onClick={()=>manualSearch(start, end)}>Go</Button>
                </ListItem>
                <ListItem >
                    <Button onClick={()=> chooseRange(24,'hour') }>24h</Button>
                    <Button onClick={()=> chooseRange(7,'day') }>7d</Button>    
                    <Button onClick={()=> chooseRange(14,'day') }>14d</Button>  
                    <Button onClick={()=> chooseRange(30,'day') }>30d</Button>
                    <Button onClick={()=> chooseRange(90,'day') }>90d</Button>
                </ListItem>
                <ListItem >
                    <Button onClick={()=> setGroupBy('5s')}>10m</Button>
                    <Button onClick={()=> setGroupBy('1m')}>10m</Button>
                    <Button onClick={()=> setGroupBy('10m')}>10m</Button>
                    <Button onClick={()=> setGroupBy('30m')}>30m</Button>
                    <Button onClick={()=> setGroupBy('1h')}>1h</Button>    
                    <Button onClick={()=> setGroupBy('4h')}>4h</Button>  
                    <Button onClick={()=> setGroupBy('6h')}>6h</Button>
                </ListItem>
            </GridItem>


                { history.length>0 &&
                    <LineChart
                        width={chartwidth} height={chartheight} data={history} 
                        margin={{ top: 16, right: 16, left: 8, bottom: 16, }} >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="time" tickCount={10} scale={'time'} type="number" domain={['dataMin', 'dataMax']} 
                                tick={<CustomizedAxisTick />} />
                        <YAxis type="number" domain={[65,80]} width={32}/>
                        <Line connectNulls type="monotone" dataKey="round" stroke="#ff7300" dot={true} strokeWidth={2} />
                    </LineChart>
                }
        </GridSection>
    )

};
