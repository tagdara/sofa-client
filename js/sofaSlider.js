import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';;

const styles = theme => ({
 
    half: {
        alignItems: "center",
        display: "flex",
        height: 42,
        flexGrow: 1,
        flexBasis: 0,
        boxSizing: "border-box",
    },
    stack: {
        height: 42,
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
    xstackLabel: {
        alignSelf: "flex-end",
    },


});

class SofaSlider extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            delaySet: false,
            drag: false,
            prechange: false,
            sendPrechange: false,
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

    handleDrag = (event,value) => {
        console.log('handledrag',event.target, value, this.state.drag)
        this.setState({prechange:false})
    }

    handlePostPreChange = (event) => {
        this.props.preChange(event);
        if (this.state.sendPrechange) {
            this.props.change(this.state.value)
            this.setState({sendPrechange:false})
        }
    }

    handlePreChange = (event,value) => {
        console.log('handleprechange',value, this.state.drag)
        this.setState({ value: value, delaySet: true, prechange:true}, () => this.handlePostPreChange(event));
    }; 

    handleChange = (event,value) => {
        console.log('handlechange',value, this.state.drag)
        this.setState({drag: false})
        if (this.state.prechange) {
            this.props.change(this.state.value);
        } else {
            this.setState({sendPrechange: true})
            console.log('change called before prechange')
        }
    }; 
    
    delaySliderUpdates = () => {
        console.log('dsu')
        this.setState({ delaySet: true},
            () =>  setTimeout(() => endSliderDelay(), 1000)
        )
    }
    
    endSliderDelay = () => {
        this.setState({ delaySet: false});
    }
   
    render() {

        const { classes, disabled, name, unit, padLeft, half } = this.props;

        return (
                    <div className={ padLeft ? classes.stack+" "+classes.padLeft: ( half ? classes.half : classes.stack) } >
                    { name ?
                        <Typography variant="subtitle1" className={classes.stackLabel} >{this.props.name}</Typography>
                    : null }
                    { unit ?
                        <Typography variant="caption" className={classes.stackLabel} >{Math.floor(this.state.value)+this.props.unit}</Typography>
                    : null }
                        <Slider
                            classes={{ container: classes.slider }}
                            value={this.state.value} step={this.props.step} 
                            min={this.props.min} max={this.props.max}
                            onChange={this.handlePreChange}
                            onDragEnd={this.handleChange}
                            onDragStart={this.handleDrag}
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
    half: false,
}

SofaSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SofaSlider);

