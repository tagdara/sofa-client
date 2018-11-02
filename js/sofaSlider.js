import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
 
    litAvatar: {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    stack: {
        height: 44,
        display: "flex",
        flexGrow: 1,
        paddingLeft: 16,
        justifyContent: "space-between",
        flexWrap: "wrap",
        maxWidth: 480,
        minWidth: 240,
        boxSizing: "border-box",
    },
    stackLabel: {
        alignSelf: "center",
    },
    stackSlider: {
        marginTop: 4,
        marginLeft: 4,
        marginRight: 6,
    },


});

class SofaSlider extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}

        if (nextProps.hasOwnProperty('value')) {
            changes.value=nextProps.value
        }
        return changes
    }

    handlePreChange = event => {
        this.setState({ value: event });
    }; 

    handleChange = event => {
        this.props.onChange(event);
    }; 
   
    render() {

        const { classes } = this.props;

        return (
                    <div className={classes.stack}>
                        <Typography variant="subheading" className={classes.stackLabel} gutterBottom>{this.props.name}</Typography>
                        <Typography variant="caption" className={classes.stackLabel} gutterBottom>{this.state.value+this.props.unit}</Typography>
                        <Slider min={this.props.min} max={this.props.max} defaultValue={this.props.default} step={this.props.step} value={this.state.value}
                            onChange={this.props.preChange} 
                            onAfterChange={this.props.change} 
                            trackStyle={ this.props.dis ? { backgroundColor: 'silver', height: 3 }: { backgroundColor: 'orangeRed', opacity: .5, height: 3 }}
                            handleStyle={ this.props.dis ?
                                { borderColor: 'silver', backgroundColor: 'silver', marginTop: -5, height: 12, width: 12} :
                                { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -5, height: 12, width: 12} 
                            }
                            railStyle={{ height: 3 }}
                            disabled={ this.props.dis }
                        />
                    </div>

        );
    }
}

SofaSlider.defaultProps = {
    name: '',
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    value: 0,
    tabs: '',
    dis: false,
}

SofaSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SofaSlider);

