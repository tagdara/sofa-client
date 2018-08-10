
import React from "react";
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';

const styles = theme => ({

    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        padding: "16 8",
        flexWrap: 'wrap',
    },
    root: {
        display: 'flex',
        maxWidth: '480px',
        margin: 1,
        boxSizing: "border-box",
        padding: '16px 4px',
        flexWrap: 'wrap',
    },                
    chip: {
        margin: theme.spacing.unit,
    },
    
    
});


class AreaListScenes extends React.Component {

    state = {
        open: false,
        target: "",
    };

    handleClick = (item, reason) => {
  	    fetch('http://home.dayton.home:8090/command/'+item, { 
                method: "POST",
                body: JSON.stringify({'op':'command'}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
  	        }
        )
        .then(result=>result.json())
        .then(data=>this.setState({target: data.path}))
        .then(this.setState({ open: true }));
    };
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }   

        this.setState({ open: false });
    };
    
    constructor(props) {
        super(props);

        this.state = {
            scenes: [],
        };
    }

    componentDidMount() {
  	    fetch('/data/globalScenes')
 		    .then(result=>result.json())
            .then(data=>this.setState({scenes: data}));
    }

    render() {
        
        const { classes } = this.props;
        const { scenes } = this.state;  

        return (


            <Card className={classes.card}>
                {   
                    scenes.map((scene) => (
                        <Chip 
                            key = { scene }
                            label={ scene } 
                            className={ classes.chip }
                            onClick={ () => this.handleClick(scene)}
                        />
                    ))
                }
            <Snackbar
                anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={1000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Macro started: {this.state.target}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
            </Card> 
        );
    }
}

AreaListScenes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AreaListScenes);