import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Dialog from '@material-ui/core/Dialog';
import Slide from  '@material-ui/core/Slide';
import SofaDialogTitle from './sofaDialogTitle';

const styles = theme => ({
    dialog: {
        overflowX: "hidden",
    }


});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class SofaDialog extends React.Component {

    render() {
        
        const { classes, fullScreen, maxWidth, open, close, title, tabs, tabValue, tabChange } = this.props;
        
        return (
            <Dialog className={classes.dialog}
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={maxWidth}
                open={open}  
                onClose={close}
                TransitionComponent={Transition}
            >
                <SofaDialogTitle title={title} tabs={tabs} tabValue={tabValue} tabChange={tabChange} />

                {this.props.children}
            </Dialog>
        )
    }

}

SofaDialog.defaultProps = {
    maxWidth: 'sm',
    tabs: '',
    tabVale: '',
    tabChange: '',
}

SofaDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(SofaDialog));
