import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';

import Grid from '@material-ui/core/Grid';
import PageActions from './PageActions';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '@material-ui/core/Chip';
import ErrorBoundary from './ErrorBoundary';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';


const useStyles = makeStyles(theme => {
    return {
        gridColumn: {
            margin: 1,
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            padding: "3px !important",
            backgroundColor: theme.palette.layer.section,
            borderRadius: "4px 4px 4px 4px",
            maxWidth: "24%",
        },
        gridWide: {
            margin: 1,
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "start",
            padding: "3px !important",
            backgroundColor: theme.palette.layer.section,
            borderRadius: "4px 4px 4px 4px",
            maxWidth: "96%",
        },
        mobileGridColumn: {
            height: "100%",
            margin: 0,
            overflowX: "hidden",
            //overflowY: "hidden",
            alignContent: "start",
            padding: "3px !important",
            backgroundColor: theme.palette.layer.section,
            borderRadius: "4px 4px 4px 4px",
        },
        paddedToolbar: {
            paddingBottom: "env(safe-area-inset-bottom)",
            marginBottom: "env(safe-area-inset-bottom)",
        },
        actionsChip: {
            margin: 6,
            backgroundColor: theme.palette.layer.card,
            '&:hover': {
                borderColor: theme.palette.primary.dark,
            }  
        },
        title: {
            padding: 8,
            display: "flex",
            flexGrow: 2,
        }
    }
});

export default function SofaPage(props) {
    
    const classes = useStyles();
    const { renderSuspenseModule } = useContext(LayoutContext);
    const [showActions, setShowActions] = useState(false)

    return (
            <Grid   container item spacing={0} key={props.name} xs={ ( props.isMobile || props.wide ) ? 12 : 3 } 
                    className={ classNames(
                                    (props.isMobile) && classes.mobileGridColumn,
                                    (props.wide && !props.isMobile) && classes.gridWide,
                                    (!props.wide && !props.isMobile) && classes.gridColumn
                    )} >
                <Typography variant="subtitle1" className={classes.title} >{props.name}</Typography>
                { ( props.page && props.page.hasOwnProperty('actions') ) && 
                   <Chip
                        className={classes.actionsChip}
                        label={ !showActions ? "Actions" : "Close" }
                        clickable
                        onClick={ () => setShowActions(!showActions) }
                      />
                }
                { (props.page && props.page.hasOwnProperty('actions') && showActions) && 
                    <PageActions actions={props.page.actions} name={props.name} />
                }
                { props.page && props.page.cards.map( (item, i) => 
    				<ErrorBoundary wide={true} key={props.name+i} >
    					{ renderSuspenseModule(item['module'], item['props']) }
    				</ErrorBoundary>
                )}
                {1==2 &&
                    <Toolbar className={classes.paddedToolbar}/>
                }
            </Grid>
    );
}

SofaPage.defaultProps = {
    wide: false,
}

