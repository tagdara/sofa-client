import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import WarningIcon from '@material-ui/icons/Warning';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Input from '@material-ui/core/Input';
import Slider, { Range } from 'rc-slider';
import deepOrange from '@material-ui/core/colors/deepOrange';
import 'rc-slider/assets/index.css';

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
            setpoint: 0,
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (nextProps.hasOwnProperty('lightdata')) {
            if (nextProps['lightdata'].hasOwnProperty('set')) {
                if (Array.isArray(nextProps['lightdata']['set'])) {
                    changes.setpoint=0
                } else {
                    changes.setpoint=nextProps['lightdata']['set']
                }
            }
        }

        return changes
    }
    
    handlePreLevelsChange = event => {
        this.setState({ setpoint: event });
    }; 

    handleLevelsChange = event => {
        this.props.levelsChange(this.props.area, this.props.scene, this.props.light, this.state.setpoint)
    }; 

    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
                <ListItem>
                    <ListItemIcon>
                        <LightbulbOutlineIcon />
                    </ListItemIcon>
                    <div className={classes.stack}>
                        <Typography variant="subheading">{this.props.light}</Typography>
                        <Slider min={0} max={100} defaultValue={this.state.setpoint} step={1} 
                            trackStyle={{ backgroundColor: deepOrange[300], opacity: .5, height: 3 }}
                            handleStyle={{ borderColor: deepOrange[200], backgroundColor: deepOrange[200], marginTop: -5, height: 12, width: 12}}
                            railStyle={{ height: 3 }}
                            className={classes.stackSlider}
                            onChange={this.handlePreLevelsChange}
                            onAfterChange={this.handleLevelsChange}
                            allowCross={false}
                        />
                    </div>
                    </ListItem>
                )
    }
};

SceneEditorLine.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SceneEditorLine);

