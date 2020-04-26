import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles({
    
    start: {
        paddingRight: 8,
    },
});

const BootstrapInput = withStyles(theme => ({
    input: {
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

export default function TimeEntry(props) {
    
    const classes = useStyles();
    const [presetMode, setPresetMode] = useState(false)
    const [preset, setPreset]=useState('Sunset')
    const [offset, setOffset]=useState(0)
    const [specificTime, setSpecificTime]=useState('08:00:00')

    useEffect(() => {
        if (props.value!==undefined) {
            if (props.value.includes(':')) {
                setSpecificTime(props.value)
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
        console.log('partval',part,val)
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
            newval=val
        }
        props.updateValue(props.label, newval)
    }

    return (
        <>
            { presetMode ?
                <>
                    <Select onChange={(e) => handleChange('preset', e.target.value) } value={ preset } input={<BootstrapInput name="Preset" id="Preset" />} >
                        <MenuItem value=""><em>Choose a property</em></MenuItem>
                        <MenuItem value="Sunrise">Sunrise</MenuItem>
                        <MenuItem value="Sunset">Sunset</MenuItem>
                    </Select>
                    <TextField className={classes.start} variant="outlined" onChange={(e) => handleChange('offset', e.target.value) }
                            id={ "offset" } label={ "offset" } type="number" value={ offset }
                            InputLabelProps={{ shrink: true, }} inputProps={{ step: 5, style: {padding: 10 } }}  />
                </>
            :
                <TextField className={classes.start} variant="outlined" onChange={(e) => handleChange('time', e.target.value) }
                        id={ props.label } label={ props.label } type="time" value={ specificTime }
                        InputLabelProps={{ shrink: true, }} inputProps={{ step: 5, style: {padding: 10 } }}  />
            }

            <IconButton size={"small"} onClick={() => setPresetMode(!presetMode) } ><ListIcon /></IconButton>
        </>
    );

}