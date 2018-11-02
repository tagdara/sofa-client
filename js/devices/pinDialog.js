import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import SofaDialog from "../sofaDialog"

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({

    content: {
        minWidth: 0,
        paddingBottom: 16,
    },
    gridList: { 
        maxWidth: 320,
        paddingTop: 16,
        margin: "0 auto !important",
    },
    gridButtonTile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridTitle: {
        margin: 1,
        alignItems: "center",
        display: "flex",
        paddingBottom: 16,
        justifyContent: "space-around",
    },
    bigButton: {
        height: "100%",
    }
});

class PinDialog extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            pin: '',
        };
    }   
    
    addNumberToPin = dig => {
        this.setState({ pin: this.state.pin+dig });
    };  
    
    editPin = pin => {
        this.setState({ pin: pin });
    };    
    
    submitPin() {
        this.props.submitPin(this.state.pin)
        this.setState({pin:''})
    }

    render() {

        const { classes, fullScreen } = this.props;

        return (
            <SofaDialog title="Enter PIN" open={this.props.open} close={this.props.close} >
               <DialogContent>
                    <GridList cellHeight={80} className={classes.gridList} cols={3}>
                        <GridListTile cols={3} className={classes.gridButtonTile} >
                            <TextField
                                className={classes.nameInput}
                                id="required"
                                margin="normal"
                                variant="filled"
                                value={this.state.pin}
                                type="password"
                                onChange={(e) => this.editPin(e.target.value) }
                            />
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile} onClick={() => this.addNumberToPin('1')}>
                            <Button className={classes.bigButton} variant="outlined" onClick={() => this.addNumberToPin('1')}>1</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button className={classes.bigButton} variant="outlined" onClick={() => this.addNumberToPin('2')}>2</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button className={classes.bigButton} variant="outlined" onClick={() => this.addNumberToPin('3')}>3</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button className={classes.bigButton} variant="outlined" onClick={() => this.addNumberToPin('4')}>4</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button className={classes.bigButton} variant="outlined" onClick={() => this.addNumberToPin('5')}>5</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button className={classes.bigButton} variant="outlined" onClick={() => this.addNumberToPin('6')}>6</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button className={classes.bigButton} variant="outlined" onClick={() => this.addNumberToPin('7')}>7</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button className={classes.bigButton} variant="outlined" onClick={() => this.addNumberToPin('8')}>8</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button className={classes.bigButton} variant="outlined" onClick={() => this.addNumberToPin('9')}>9</Button>
                        </GridListTile>
                        <GridListTile cols={3} className={classes.gridButtonTile}>
                            <Button className={classes.bigButton} variant="outlined" onClick={() => this.addNumberToPin('0')}>0</Button>
                        </GridListTile>
                        <GridListTile cols={3} className={classes.gridButtonTile} >
                            <Button className={classes.bigButton} onClick={() => this.submitPin()} autoFocus>Go</Button>
                        </GridListTile>
                    </GridList>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.close() }>
                        Cancel
                    </Button>
                </DialogActions>
            </SofaDialog>
        );
    }
}

PinDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PinDialog);
