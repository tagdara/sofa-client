import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({

    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "borderbox",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardname: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: 8,
    },
    content: {
        minWidth: 0,
        paddingBottom: 16,
    },
    metadata: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    chip: {
        background: "silver",
        color: "black",
        margin: theme.spacing.unit,
    },

    hotchip: {
        background: "orangeRed",
        color: "white",
        margin: theme.spacing.unit,
    },
    paperLight: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
    },
    stackedVolumeControl: {
        paddingLeft: 16,
        paddingRight: 16,
        flex:1,
    },
    slider: {
        paddingTop: 0,
        paddingRight: 28,
        paddingLeft: 10,
    },
    slidername: {
        display: "flex",
        paddingRight: 0,
        paddingLeft: 10,
        alignItems: "center",
    },    
    dialog: {
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        maxWidth: '480px',
        minWidth: '320px',
        boxSizing: "border-box",
    },
    cover: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
        margin: 16,
    },
    embeddedExpansion: {
        padding:0,
        display: "block",
    },
    chipLine: {
        width: "100%",
    },
    gridList: { 
        maxWidth: 320,
        paddingTop: 16,
    },
    gridButtonTile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridTitle: {
        alignItems: "center",
        display: "flex",
        paddingBottom: 16,
        justifyContent: "space-around",
    }
});

class PinDialog extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            tracked: ['surround','decoder','input','volume','powerState'],
            endpointId: '',
            surround: '',
            decoder: '',
            input: '',
            volume: 0,
            powerState: false,
            icon: '/react/images/tv.jpg?v2',
            pin: '',
        };
    }   
    
    addNumberToPin = dig => {
        this.setState({ pin: this.state.pin+dig });
    };    
    
    submitPin() {
        this.props.submitPin(this.state.pin)
        this.setState({pin:''})
    }

    render() {

        const { classes, theme } = this.props;

        return (
            <Dialog open={this.props.showPinPad} onClose={() => this.props.closeDialog()} className={this.props.classes.dialog}>
                <DialogActions>
                    <IconButton onClick={() => this.props.closeDialog() }>
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                <DialogTitle className={classes.gridTitle}>
                    Enter PIN
                </DialogTitle>
                <DialogContent>
                    <GridList cellHeight={80} className={classes.gridList} cols={3}>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button size="small" variant="outlined" onClick={() => this.addNumberToPin('1')}>1</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button size="small" variant="outlined" onClick={() => this.addNumberToPin('2')}>2</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button size="small" variant="outlined" onClick={() => this.addNumberToPin('3')}>3</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button size="small" variant="outlined" onClick={() => this.addNumberToPin('4')}>4</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button size="small" variant="outlined" onClick={() => this.addNumberToPin('5')}>5</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button size="small" variant="outlined" onClick={() => this.addNumberToPin('6')}>6</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button size="small" variant="outlined" onClick={() => this.addNumberToPin('7')}>7</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button size="small" variant="outlined" onClick={() => this.addNumberToPin('8')}>8</Button>
                        </GridListTile>
                        <GridListTile cols={1} className={classes.gridButtonTile}>
                            <Button size="small" variant="outlined" onClick={() => this.addNumberToPin('9')}>9</Button>
                        </GridListTile>
                        <GridListTile cols={3} className={classes.gridButtonTile}>
                            <Button size="small" variant="outlined" onClick={() => this.addNumberToPin('0')}>0</Button>
                        </GridListTile>
                        <GridListTile cols={3} className={classes.gridButtonTile} >
                            <Button size="large" onClick={() => this.submitPin()} autoFocus>Go</Button>
                        </GridListTile>
                    </GridList>
                </DialogContent>
            </Dialog>
        );
    }
}

PinDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PinDialog);
