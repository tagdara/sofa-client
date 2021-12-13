import React from 'react';
import { makeStyles } from '@mui/styles';
import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = makeStyles(theme => {
    
    return {
        scrollHolder: {
            display: "flex",
            flex:3,
            boxSizing: "border-box",
            //padding: "0px 20px",
            paddingBottom: 0,
            marginBottom: 0,
            overflowY: "auto",
            overflowX: "hidden",
            //marginLeft: "calc(100vw - 20px - 100%)",
            alignContent: "flex-start",
            flexDirection: "column",
            //backgroundColor: theme.palette.background.default,
        },
    }
});

export default function ScrollHolder(props) {

    const classes = useStyles();

    return (
        <Scrollbars style={{ position: "static" }}>
            <div className={classes.scrollHolder}>
                { props.children }
            </div>
        </Scrollbars>
    );
}
