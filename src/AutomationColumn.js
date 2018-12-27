import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Loadable from 'react-loadable';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AutomationAction from "./automation/automationAction"
import AutomationCondition from "./automation/automationCondition"
import AutomationTrigger from "./automation/automationTrigger"
import AutomationSchedule from "./automation/automationSchedule"

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

import GridItem from './GridItem';
import GridPage from './GridPage';
import GridBreak from './GridBreak';
import PlaceholderCard from './PlaceholderCard';

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

function cardLoading(props) {
    
    if (props.error) {
        console.log(props)
        return null;
    } else if (props.pastDelay) {
        return <PlaceholderCard />;
    } else {
        return null;
    }
}

function AutomationColumn(props) {

    const classes = useStyles();
    const [actions, setActions] = useState([])
    const [edit, setEdit] = useState(false)
    const [reorder, setReorder] = useState(false)
    const [remove, setRemove] = useState(false)
    const [module, setModule] = useState(null)

    const AutomationProperty = Loadable({ loader: () => import('./automation/'+props.itemModule), loading: cardLoading,});

    function getControllerProperties(item) {
        if (item.hasOwnProperty('propertyName')) {
            return props.controllerProperties[item.controller][item.propertyName]
        }
        return {}
    }    
    
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
    
    function deleteItem(index) {
        console.log('deleting item',index,'from',props.name)
        var newitems=props.items
        newitems.splice(index, 1);
        props.save(props.itemtype,newitems)
    }

    function save(index, item) {
        var newitems=props.items
        newitems[index]=item
        props.save(props.itemtype, newitems)
    }
    
    function moveUp(index) {
        if (index-1>=0) {
            var newitems=props.items
            var element = newitems[index];
            newitems.splice(index, 1);
            newitems.splice(index-1, 0, element);
            props.save(props.itemtype, newitems)
        }
    }

    function moveDown(index) {
        if (index+1<=props.items.length) {
            var newitems=props.items
            var element = newitems[index];
            newitems.splice(index, 1);
            newitems.splice(index+1, 0, element);
            props.save(props.itemtype, newitems)
        }
    }

    function addItem() {
        setRemove(false); 
        setReorder(false) 
        props.setReturn('AutomationLayout', {'name': props.automationName, 'type':props.itemtype })
        props.setBack('AutomationLayout', {'name': props.automationName } )
        props.setLayoutCard(props.selector)
    }

    return (    
        <GridPage>
            <GridBreak label={props.name} size="h6" >
                <IconButton onClick={ () => addItem() } className={classes.button }>
                    <AddIcon fontSize="small" />
                </IconButton>
                { Object.keys(props.items).length>0 &&
                <IconButton onClick={ () => { setRemove(!remove); setReorder(false); }} className={classes.button }>
                    <RemoveIcon fontSize="small" />
                </IconButton>
                }
                { (props.itemtype!='trigger' && Object.keys(props.items).length>1) &&
                <IconButton onClick={ () => { setRemove(false); setReorder(!reorder) }} className={classes.button }>
                    <UnfoldMoreIcon fontSize="small" />
                </IconButton>
                }
            </GridBreak>
            { Object.keys(props.items).length>0 ?
                <React.Fragment>
                    { props.items.map((item,index) => 
                        <AutomationProperty key={props.itemtype+index} moveUp={moveUp} moveDown={moveDown} save={save} remove={remove} reorder={reorder} delete={deleteItem} 
                                index={index} item={item} device={ props.deviceByEndpointId(item.endpointId) } name={props.deviceByEndpointId(item.endpointId).friendlyName} 
                                directives={props.directives} controllerProperties={ getControllerProperties(item)} wide={true} 
                                />
                    )}
                </React.Fragment>
                :
                <GridItem elevation={0} wide={true}>
                    <ListItem>
                        <ListItemText primary={"There are no "+props.name+" defined."} />
                    </ListItem>
                </GridItem>
            }
        </GridPage>
    )

};

export default withData(AutomationColumn);