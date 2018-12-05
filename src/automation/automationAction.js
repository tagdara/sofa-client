import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import ShuffleIcon from '@material-ui/icons/Shuffle';
import CloseIcon from '@material-ui/icons/Close';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DataUsageIcon from '@material-ui/icons/DataUsage';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import SpeakerIcon from '@material-ui/icons/Speaker';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import TuneIcon from '@material-ui/icons/Tune';
import ListIcon from '@material-ui/icons/List';
import TvIcon from '@material-ui/icons/Tv';
import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';

const styles = theme => ({
        
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
        padding: 0,
        flexGrow:1,
        flexBasis:0,
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
    listItem: {
        padding: 16,

    },
    item: {
        padding: 16,
    },

});


class AutomationAction extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            parentField: "",
            fields: [],
            editVal: {},
            icons: {'SCENE_TRIGGER':TuneIcon, 'ACTIVITY_TRIGGER':ListIcon, 'LIGHT':LightbulbOutlineIcon, 'BUTTON':TouchAppIcon, 'SPEAKER':SpeakerIcon, 'THERMOSTAT':DataUsageIcon, 'RECEIVER':SpeakerGroupIcon, 'TV':TvIcon}
        }
    }
    
    getIcon = (category, size='default') => {

        if (this.state.icons.hasOwnProperty(category)) {
            var RealIcon=this.state.icons[category]
        } else {
            var RealIcon=DeveloperBoardIcon
        }
        return <RealIcon size={24} fontSize={size} />
    }

    editValue = (value) => {
        var action=this.props.action
        action.value=value
        this.save(action)
    }
    
    editValues = (action, value) => {
        var edval=this.state.editVal
        edval[action]=value     
        
        if (this.state.parentField) {
            var parval={}
            parval[this.state.parentField]=edval
            this.setState({editVal:edval}, () => this.editValue(parval))
        } else {
            this.setState({editVal:edval}, () => this.editValue(edval))
        }
        console.log(action, value)
        
    }
    
    save = (action) => {
        this.props.save(this.props.index, action)
    }
    
    componentDidMount() {
        var subfields=[]
        var edval={}
        var parent=""

        for (var av in this.props.actionValues) {
            if (typeof this.props.actionValues[av] === 'object') {
                parent=av
                for (var avsub in this.props.actionValues[av]) {
                    //console.log(av,avsub,this.props.actionValues[av][avsub])
                    subfields.push({ 'name':avsub, 'type': this.props.actionValues[av][avsub] })
                    edval[avsub]=''
                    if (this.props.action.value.hasOwnProperty(av)) {
                        if (this.props.action.value[av].hasOwnProperty(avsub)) {
                            console.log(this.props.action.value[av][avsub])
                            edval[avsub]=this.props.action.value[av][avsub]
                        }
                    }
                }
            } else {
                console.log('not an object',this.props.actionValues[av])
                subfields= [{ "name":av, "type": this.props.actionValues[av] }]
                edval[av]=''
                if (this.props.action.value.hasOwnProperty(av)) {
                    edval[av]=this.props.action.value[av]
                }
            }
        }
        this.setState({fields: subfields, editVal:edval, parentField: parent})
    }

    render() {
        
        const { classes, index, name, action, propertyName, device} = this.props;
        const { editVal, fields } = this.state;
        
        return (
            <ListItem className={classes.item} >
                {this.props.edit ?
                <ListItemIcon onClick={() => this.props.delete(index)}><CloseIcon /></ListItemIcon>   
                :
                <ListItemIcon onClick={() => this.props.run(name,index)}>{this.getIcon(device.displayCategories[0])}</ListItemIcon>
                }
                <ListItemText primary={device.friendlyName} secondary={action.controller.replace('Controller','')+" / "+action.command} className={classes.deviceName}/>
                { fields.map((action,index) =>
                    <TextField
                        className={classes['areaInput'+action.type]}
                        id={'action'+index}
                        label={action.name}
                        margin="dense"
                        value={editVal[action.name]}
                        onChange={(e) => this.editValues(action.name, e.target.value)}
                    />
                )}
                {this.props.edit ?
                    <ListItemSecondaryAction className={classes.listItem}>
                        <IconButton onClick={() => this.props.moveUp(index)}><ExpandLessIcon /></IconButton>   
                        <IconButton onClick={() => this.props.moveDown(index)}><ExpandMoreIcon /></IconButton>
                    </ListItemSecondaryAction>
                : null }
            </ListItem>
        )
    }
}

AutomationAction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutomationAction);
