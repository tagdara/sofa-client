import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ToggleAvatar from './ToggleAvatar';
import GridItem from "./GridItem"
import classnames from 'classnames';

const useStyles = makeStyles(theme => {
    return {        
        root: {
            minHeight: 72,
            display: "flex",
            width: "100%",
        },
        listItem: {
            padding: "8px 8px",
        },
        working: {
            marginLeft: 4,
        },
        padLabel: {
            paddingLeft: 28,
            display: "flex",
            alignItems: "center",
        },
        label: {
            display: "flex",
            alignItems: "center",
        },
        item: {
            margin: 4,
            minHeight: 54,
            flexGrow:1,
            borderRadius: 4,
            backgroundColor: theme.palette.layer.item,
            width: "auto",
            padding: 8,
        },
        sceneButton: {
            display: "flex",
            width: "100%",
        },
        noMargin: {
            margin: 0,
        },
        noPad: {
            padding: 0,
        },
        highlight: {
            backgroundColor: theme.palette.layer.itemHighlight,
        }
    }
});


export default function ButtonItem(props) {
    
    const classes = useStyles();

    var ButtonObject =  (
        <ListItem   button={props.button} className={classnames(classes.item, props.highlight && classes.highlight, props.noMargin && classes.noMargin, props.noPad && classes.noPad)} 
                    onClick={ () =>  !props.labelClick && props.action()}>
            <div className={classes.sceneButton}>
                <ToggleAvatar noback={props.noback===undefined ? true : props.noback} avatarState={props.avatarState ? props.avatarState : 'off'} small={props.small} >
                    { props.avatarIcon }
                </ToggleAvatar>
                <ListItemText onClick={ () => props.labelClick && props.action() } className={props.small ? classes.padLabel : classes.label } primary={props.label} secondary={props.labelSecondary} />
                { props.secondary }
            </div>
        </ListItem>
    )

    return (
        <>
        { !props.noGrid ?
            <GridItem xs={props.xs} thinmargin={props.thinmargin} nopaper={ props.noPaper } noPad={props.noPad} nolist={props.nolist} >
                { ButtonObject }
                { props.children }
            </GridItem>
            :
            <>
                { ButtonObject }
                { props.children }
            </>
        }
        </>
    )    

};

ButtonItem.defaultProps = {
    noPaper: true,
    button: true
}
