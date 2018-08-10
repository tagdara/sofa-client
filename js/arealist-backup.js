
import React from "react";
import Area from './area';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
        
    areaList: {
        paddingBottom: 4,
        minWidth: 320,
    },
});

class AreaList extends React.Component {
    
    //shouldComponentUpdate(nextProps, nextState) {
    //   console.log(nextProps);
    //   return true;
    //}
     
    constructor(props) {
        super(props);

        this.state = {
            areas: {}
        };
    }

    componentDidMount() {
  	    fetch('http://home.dayton.home:8090/data/areas')
 		    .then(result=>result.json())
            .then(data=>this.setState({areas: data}));
    }
    
    render() {
        
        const { classes } = this.props;
        const { areas } = this.state;  
        
        return (
            <div className={classes.areaList}>
                {
                    Object.keys(areas).sort().map(name => (
                        <Area key={ name } name={ name } devices={ areas[name]} wsUpdate={this.props.wsUpdate} sender={this.props.sender}></Area>
                    ))
                }
            </div> 
        );
    }
}

AreaList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AreaList);
