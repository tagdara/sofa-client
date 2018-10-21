
import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Shade from './devices/shade';
import Sprinkler from './devices/sprinkler';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
        
    list: {
        paddingBottom: 4,
        minWidth: 320,
    },
});



class VirtualList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            devices: {},
        };
    }   
    
    componentDidMount() {
  	    fetch('/config/virtualDevices')
 		    .then(result=>result.json())
 		    .then(data=>this.setState({devices:data}))
    }
    
    render() {
    
        const { classes } = this.props;
        
        return (
            <div className={classes.list}>
                {
                    Object.keys(this.state.devices).map((key, index) => (
                        this.state.devices[key]['type']=='windowshade' ?
                            <Shade key={ index } name={ key } up={ this.state.devices[key]['commands']['up']['target']  }  stop={ this.state.devices[key]['commands']['stop']['target'] }  down={ this.state.devices[key]['commands']['down']['target']  } sendAlexaCommand={this.props.sendAlexaCommand} />
                            :null
                    ))
                }
                <Divider />
                {
                    Object.keys(this.state.devices).map((key, index) => (
                        this.state.devices[key]['type']=='water' ?
                            <Sprinkler key={ index } name={ key } on={ this.state.devices[key]['commands']['on']['target']  }  off={ this.state.devices[key]['commands']['off']['target']  } sendAlexaCommand={this.props.sendAlexaCommand} />
                            :null
                    ))
                }
            </div> 
        );
    }
}

VirtualList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VirtualList);
