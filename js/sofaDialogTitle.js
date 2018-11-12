import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Slide from  '@material-ui/core/Slide';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({

    dialogTitleText: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.primary.contrastText,
        height: 36,
    },
    smallBar: {
        padding:0,
        paddingTop: "env(safe-area-inset-top)",
        backgroundColor: theme.palette.primary.dark,
    },
    bigBar: {
        padding:0,
        paddingTop: "env(safe-area-inset-top)",
        backgroundColor: theme.palette.primary.dark,
    },
    titleBar: {
        height: 36,
        minHeight: 36,
    },
    tabBar: {
        height: 48,
        minHeight: 48,
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
    },
    tabs: {
        color: theme.palette.primary.contrastText,
    }

});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class SofaDialogTitle extends React.Component {

    render() {
        
        const { classes, title, tabValue, tabs } = this.props;
        
        return (
            <DialogTitle className={this.props.tabs ? classes.bigBar: classes.smallBar}>
                { title ?
                <Toolbar elevation={0} className={classes.titleBar}>
                    <Typography variant="subtitle1" className={classes.dialogTitleText}>
                        {title}
                    </Typography>
                </Toolbar>
                : null }
                { tabs ?
                <Toolbar elevation={0} className={classes.tabBar} >
                    <Tabs centered className={classes.tabs} value={tabValue} onChange={this.props.tabChange}>
                        { this.props.tabs.map((name) => 
                            <Tab key={name} label={name} />
                        )}
                    </Tabs>
                </Toolbar>
                : null }
            </DialogTitle>
        )
    }

}

SofaDialogTitle.defaultProps = {
    tabs: '',
}

SofaDialogTitle.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SofaDialogTitle);
