import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({

    off: {
        minWidth: 36,
        marginLeft: 2,
    },
    on: {
        marginLeft: 2,
        minWidth: 36,
        "&:hover" : {
            backgroundColor: theme.palette.primary.light,
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    
});

class ToggleButton extends React.Component {

    render() {

        const avclass=this.props.classes[this.props.buttonState]
        
        return (
            <Button size="small" className={ avclass } onClick={ this.props.onClick} >
                {this.props.label ? this.props.label : this.props.children}
            </Button>
        )
    }
};

export default withStyles(styles)(ToggleButton);
