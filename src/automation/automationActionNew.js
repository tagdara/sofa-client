import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

import CloseIcon from '@material-ui/icons/Close';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import GridItem from '../GridItem';
import DeviceIcon from '../DeviceIcon';
import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles({
        
    areaInput: {
        marginLeft: 16,
        flexGrow:1,
        flexBasis:0,
    },
    areaInputstring: {
        marginLeft: 16,
        flexGrow:1,
        flexBasis:0,
    },
    areaInputdecimal: {
        marginLeft: 16,
        width: 40,
        overflowX: "hidden",
    },
    areaInputpercentage: {
        marginTop:0,
        marginLeft: 16,
        width: 40,
        overflowX: "hidden",
    },
    areaInputinteger: {
        marginTop:0,
        marginLeft: 16,
        width: 40,
        overflowX: "hidden",
    },
    deviceName: {
        flexGrow:1,
        flexBasis:0,
        padding: 0,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    dialogContent: {
        padding: 0,
    },
    listActions: {
        minWidth: 320,
        width: "100%",
    },
    spacer: {
        maxWidth: 40,
        minWidth: 40,
        minHeight: 42,
    },
    xxlistItem: {
        padding: "12 16",
    },
    bottomListItem: {
        minHeight: 72,
        padding: "0 0 0 16",
    },
    flex: {
        padding: "0 16px 8px 16px",
        display: "flex",
        alignItems: "center",
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

export default function AutomationActionNew(props) {

    const classes = useStyles();
    const [parentField, setParentField] = useState({})
    const [fields, setFields] = useState([])
    const [editVal, setEditVal] = useState({})
    const actionValues = getActionValues(props.item.controller, props.item.command)

    useEffect(() => {
        function parseActionValues() {
    
            var subfields=[]
            var edval={}
            var parent=""
            
            for (var av in actionValues) {
                if (typeof actionValues[av] === 'object') {
                    parent=av
                    for (var avsub in actionValues[av]) {
                        subfields.push({ 'name':avsub, 'type': actionValues[av][avsub] })
                        edval[avsub]=''
                        if (props.item.hasOwnProperty('value')) {
                            if (props.item.value.hasOwnProperty(av)) {
                                if (props.item.value[av].hasOwnProperty(avsub)) {
                                    edval[avsub]=props.item.value[av][avsub]
                                } 
                            }
                        }
                    }
                } else {
                    console.log('not an object',actionValues[av])
                    subfields= [{ "name":av, "type":actionValues[av] }]
                    edval[av]=''
                    if (props.item.hasOwnProperty('value')) {
                        if (props.item.value.hasOwnProperty(av)) {
                            edval[av]=props.item.value[av]
                        }
                    }
                }
            }
            setFields(subfields)
            setEditVal(edval)
            setParentField(parent)
        }

        parseActionValues()
    }, [props.item, actionValues]);

    function getActionValues(controller, command) {
        return props.directives[controller][command]
    }

    function editValues(action, value) {
        var newitem=props.item // working copy of props
        var edval=editVal

        edval[action]=value     
        
        if (parentField) {
            var parval={}
            parval[parentField]=edval
            setEditVal(edval)
            newitem.value=parval
            props.save(props.index, newitem)
        } else {
            setEditVal(edval)
            newitem.value=edval
            props.save(props.index, newitem)
        }
        console.log(action, value)
    }

    function controlMapper(action, index) {
        
        if (action.name==='endpointId') {
            return <Button onClick={() => props.selectDevice(editVal[action.name])}>{ editVal[action.name] ? editVal[action.name] : 'Choose a device'}</Button>
        } else {
            return <TextField
                    key={"aat"+index}
                    className={classes['areaInput'+action.type]}
                    id={'action'+index}
                    label={action.name}
                    value={editVal[action.name]}
                    onChange={(e) => editValues(action.name, e.target.value)}
                />
        }
    }
    
    function handleChange() {
        console.log('noop change')
    }
    
    function getActions() {
        var actions=[]
        for (var i = 0; i < props.device.interfaces.length; i++) {
            actions=actions.concat(getControllerCommands(props.device.interfaces[i]))
        }
        return actions.sort()
    }
        
    function getControllerCommands(controller) {
        if (props.directives.hasOwnProperty(controller)) {
            return Object.keys(props.directives[controller])
        }
        return []
    }

    return (
        <GridItem nolist={true} elevation={0} wide={true}>
            <Grid item xs={props.wide ? 12 : 6 } >
                <ListItem className={classes.listItem} >
                    <ListItemIcon onClick={() => props.run(props.device.friendlyName, props.index)}><DeviceIcon name={props.device.displayCategories[0]} /></ListItemIcon>
                    <ListItemText className={classes.deviceName} primary={props.device.friendlyName} secondary={props.device.endpointId} />
                </ListItem>
            </Grid>
            <Grid item xs={props.wide ? 12 : 6 } className={classes.flex} >
                    <Select value={props.item.command} onChange={handleChange} input={<BootstrapInput name="command" id="command-select" />} >
                        <MenuItem value=""><em>Choose an action</em></MenuItem>
                    { getActions().map(action => 
                        <MenuItem key={props.device.endpointId+action} value={action}>{action}</MenuItem>
                    )}
   
                    </Select>
                { fields.length>0 &&
                    <React.Fragment>

                    { fields.map((action,index) => { return controlMapper(action,index)} )}
                    </React.Fragment>
                }
                    { props.remove &&
                        <Button variant="contained" color="primary"  onClick={() => props.delete(props.index)}><CloseIcon /></Button>     
                    }
                    { props.reorder &&
                        <ButtonGroup variant="contained" size="small" >
                            <Button disabled={ props.index===0 } onClick={() => props.moveUp(props.index)}><ExpandLessIcon /></Button>
                            <Button onClick={() => props.moveDown(props.index)}><ExpandMoreIcon /></Button>
                        </ButtonGroup>
                    }
            </Grid>
        </GridItem>
    )
}