import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListIcon from '@mui/icons-material/List';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import moment from 'moment'

const useStyles = makeStyles({
    
    start: {
        paddingRight: 8,
    },
});

export default function TimeEntry(props) {
    
    const classes = useStyles();
    const [presetMode, setPresetMode] = useState(false)
    const [preset, setPreset]=useState('Sunset')
    const [offset, setOffset]=useState(0)
    const [specificTime, setSpecificTime]=useState('08:00')

    useEffect(() => {
        if (props.value!==undefined) {
            if (props.value.includes(':')) {
                setSpecificTime(moment(props.value, 'HH:mm').valueOf())
            } else {
                if (props.value.includes('+')) {
                    setOffset(parseInt(props.value.split('+')[1]))
                    setPreset(props.value.split('+')[0])
                } else {
                    setOffset(-1 * parseInt(props.value.split('-')[1]))
                    setPreset(props.value.split('-')[0])
                }
            }
        }
    // eslint-disable-next-line
    }, [props.value])
    
    function handleChange(part, val) {
        var newval='unknown'
        if (part==='offset' && presetMode) {
            setOffset(val)
            if (val>=0) {
                newval=preset+"+"+val.toString()
            } else {
                newval=preset+val.toString()
            }
        } else if (part==='preset' && presetMode) {
            setPreset(val)
            if (offset>=0) {
                newval=preset+"+"+offset.toString()
            } else {
                newval=preset+offset.toString()
            }
        } else {
            setSpecificTime(val)
            newval=val.format('HH:mm')
        }
        props.updateValue(props.label, newval)
    }

    return (
        <>
            { presetMode ?
                <>
                    <Select onChange={(e) => handleChange('preset', e.target.value) } value={ preset } size="small" >
                        <MenuItem value=""><em>Choose a property</em></MenuItem>
                        <MenuItem value="Sunrise">Sunrise</MenuItem>
                        <MenuItem value="Sunset">Sunset</MenuItem>
                    </Select>
                    <TextField className={classes.start} variant="outlined" onChange={(e) => handleChange('offset', e.target.value) }
                            id={ "offset" } label={ "offset" } type="number" value={ offset }
                            InputLabelProps={{ shrink: true, }} inputProps={{ step: 5, style: {padding: 10 } }}  />
                </>
            :
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <TimePicker
                        size="small"
                        renderInput={(props) => <TextField size="small" {...props} />}
                        label="Time"
                        value={specificTime }
                        onChange={newValue =>  handleChange('time', newValue)}
                    />
                </LocalizationProvider>
            }
            <IconButton size={"small"} onClick={() => setPresetMode(!presetMode) } ><ListIcon /></IconButton>
        </>
    );

}