
import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Shade from './devices/shade';

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
  	    fetch('http://home.dayton.home:8090/data/virtual')
 		    .then(result=>result.json())
 		    .then(data=>this.setState({devices:data}))
    }
    
    render() {
    
        const { classes } = this.props;
        
        return (
            <div className={classes.list}>
                {
                    Object.keys(this.state.devices).map((key, index) => ( 
                        <Shade key={ index } name={ key } up={ this.state.devices[key]['commands']['up']['target']  }  stop={ this.state.devices[key]['commands']['stop']['target'] }  down={ this.state.devices[key]['commands']['down']['target']  } sender={this.props.sender}/>
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
