import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => {
    return {
        base: {
            display: "flex",
            margin: 0,
            overflowX: "hidden",
            alignContent: "start",
            padding: "3px !important",
            borderRadius: "4px 4px 4px 4px",
        },
        margin: {
            marginBottom: 2,
        },
        gridColumn: {
            overflowY: "hidden",
        },
        scrollColumn: {
            overflowY: "auto",
        },
        mobile: {
            flexGrow: 1
        },
        title: {
            padding: 4,
            display: "flex",
            flexGrow: 2,
        },
        titleBlock: {
            padding: 4,
            display: "flex",
            flexGrow: 1,
            flexAlign: "space-between",
        },
        background: {
            backgroundColor: theme.palette.layer.section,
        },
        center: {
            width: "100%",
            
            justifyContent: "center",
        },
        end: {
            display: "flex",
            flexGrow: 0,
            justifyContent: "flex-end",
        },
        nopad: {
            padding: "0 !important",
        },
    }
});


export default function GridSection(props) {
    
    const { isMobile } = useContext(LayoutContext);
    const classes = useStyles();
    const [show, setShow] = useState(props.show);

    return (
        <Grid container item spacing={1} key={props.name} xs={props.xs} 
            className={ classNames(classes.base, props.margin && classes.margin, props.scroll ? classes.scrollColumn : classes.gridColumn, props.background ? classes.background : null)} 
        >
            {props.name &&
                <Grid item xs={12} className={classes.titleBlock}>
                    <Typography variant="h6" className={classes.title} onClick={ () => setShow(!show) } >{props.name}</Typography>
                    <div className={ (!isMobile || !props.break) ? classes.end : classes.center}>
                        {props.secondary}
                    </div>
                </Grid>
            }
            { show && props.children}
        </Grid>
    );
}

GridSection.defaultProps = {
    break: false,
    show: true,
    scroll: false,
    xs: 12,
    background: true,
    margin: false,
}
 

