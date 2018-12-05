import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import WarningIcon from '@material-ui/icons/Warning';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Input from '@material-ui/core/Input';

import SofaSlider from './sofaSlider'

const styles = theme => ({
    

    input: {
        width: 50,
        margin: theme.spacing.unit,
    },
    stack: {
        height: 44,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: "center",
    },
    sliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: "16 8 16 16",
        alignItems: "center",
        minWidth: 320,
        maxWidth: 480,
    },
    stackSlider: {
        marginTop: 4,
        marginLeft: 4,
        marginRight: 6,
    }
});

class SceneEditorLine extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            brightness: 0,
        };
    }    

    static getDerivedStateFromProps(nextProps, prevState) {
        
        var changes={}
        if (nextProps.brightness !== prevState.brightness) {
            changes['brightness']=nextProps.brightness
        }  
        return changes
    }
    
    
    handlePreLevelsChange = event => {
        this.setState({ brightness: event });
    }; 

    handleLevelsChange = event => {
        this.props.levelsChange(this.props.endpointId, this.state.brightness)
    };

    render() {
        
        const { classes, name } = this.props;
        const { brightness } = this.state;
        
        return (
                <ListItem>
                    <ListItemIcon>
                        <LightbulbOutlineIcon />
                    </ListItemIcon>
                    <SofaSlider name={name} value={brightness} preChange={this.handlePreLevelsChange} change={this.handleLevelsChange} />
                    </ListItem>
                )
    }
};

SceneEditorLine.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SceneEditorLine);

