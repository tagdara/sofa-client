import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import ShuffleIcon from '@material-ui/icons/Shuffle';
import CloseIcon from '@material-ui/icons/Close';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import GridItem from '../GridItem';
import DeviceIcon from '../DeviceIcon';
import GridPage from '../GridPage';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
        
    areaInput: {
        marginTop:0,
        marginLeft: 16,
        flexGrow:1,
        flexBasis:0,
    },
    areaInputstring: {
        marginTop:0,
        marginLeft: 16,
        flexGrow:1,
        flexBasis:0,
    },
    areaInputdecimal: {
        marginTop:0,
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
    listItem: {
        padding: "12 16",
    },
    bottomListItem: {
        padding: "4 16 12 40",
    },
});


export default function AutomationAction(props) {

    const classes = useStyles();
    const [parentField, setParentField] = useState({})
    const [fields, setFields] = useState([])
    const [editVal, setEditVal] = useState({})
    const actionValues = getActionValues(props.item.controller, props.item.command)
    const actionValue = getActionValue(props.item.controller, props.item.command)
    
    useEffect(() => {
        parseActionValues()
    }, []);

    function getActionValues(controller, command) {
        return props.directives[controller][command]
    }

    function getActionValue(controller, command) {
        var payload=props.directives[controller][command]
        for (var prop in payload) {
            if (payload[prop].hasOwnProperty('value')) {
                return prop
            }
        } 
        return ''
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

    return (
        <GridItem nolist={true} elevation={0} wide={true}>
            <Grid item xs={props.wide ? 12 : 6 } >
                <List>
                <ListItem className={classes.listItem} >
                    <ListItemIcon onClick={() => props.run(name,index)}><DeviceIcon name={props.device.displayCategories[0]} /></ListItemIcon>
                    <ListItemText className={classes.deviceName} primary={props.name} secondary={props.item.controller.replace('Controller','')+" / "+props.item.command} />
                </ListItem>
                </List>
            </Grid>
            <Grid item xs={props.wide ? 12 : 6 } >
                <List>
                <ListItem className={classes.bottomListItem} >
                { fields.length>0 &&
                    <React.Fragment>
                    { fields.map((action,index) =>
                        <TextField
                            key={"aat"+index}
                            className={classes['areaInput'+action.type]}
                            id={'action'+index}
                            label={action.name}
                            margin="dense"
                            value={editVal[action.name]}
                            onChange={(e) => editValues(action.name, e.target.value)}
                        />
                    )}
                    </React.Fragment>
                }
                    { props.remove ?
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => props.delete(props.index)}><CloseIcon /></IconButton>     
                        </ListItemSecondaryAction>
                        : null
                    }
                    { props.reorder &&
                        <ListItemSecondaryAction>
                            <IconButton disabled={ props.index==0 } onClick={() => props.moveUp(props.index)}><ExpandLessIcon /></IconButton>
                            <IconButton onClick={() => props.moveDown(props.index)}><ExpandMoreIcon /></IconButton>
                        </ListItemSecondaryAction>
                    }
                </ListItem>
                </List>
            </Grid>
        </GridItem>
    )
}