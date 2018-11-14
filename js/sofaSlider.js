import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';;

const styles = theme => ({
 

    stack: {
        height: 48,
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        flexWrap: "wrap",
        minWidth: 240,
        width: "100%",
        boxSizing: "border-box",
        marginRight: 8,
        overflowX: "hidden",
    },
    padLeft: {
        paddingLeft: 16,
    },
    stackLabel: {
        alignSelf: "flex-end",
    },


});

class SofaSlider extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            delaySet: false,
        };
    }

    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}

        if (!prevState.delaySet) {
            if (nextProps.hasOwnProperty('value')) {
                changes.value=nextProps.value
            }
        }
        return changes
    }

    handlePreChange = (event,value) => {
        this.setState({ value: value, delaySet: true});
        this.props.preChange(event);
    }; 

    handleChange = (event,value) => {
        this.props.change(this.state.value);
    }; 
    
    delaySliderUpdates = () => {
        this.setState({ delaySet: true},
            () =>  setTimeout(() => endSliderDelay(), 1000)
        )
    }
    
    endSliderDelay = () => {
        this.setState({ delaySet: false});
    }
   
    render() {

        const { classes, disabled, name, unit, padLeft } = this.props;

        return (
                    <div className={ padLeft ? classes.stack+" "+classes.padLeft: classes.stack } >
                    { name ?
                        <Typography variant="subtitle1" className={classes.stackLabel} gutterBottom>{this.props.name}</Typography>
                    : null }
                    { unit ?
                        <Typography variant="caption" className={classes.stackLabel} gutterBottom>{this.state.value+this.props.unit}</Typography>
                    : null }
                        <Slider
                            classes={{ container: classes.slider }}
                            value={this.state.value} step={this.props.step} 
                            min={this.props.min} max={this.props.max}
                            onChange={this.handlePreChange}
                            onDragEnd={this.handleChange}
                            disabled={this.props.disabled}
                        />
                    </div>

        );
    }
}

SofaSlider.defaultProps = {
    name: '',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    value: 0,
    tabs: '',
    disabled: false,
    padLeft: false,
}

SofaSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SofaSlider);

