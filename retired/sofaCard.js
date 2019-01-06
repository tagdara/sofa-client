import React from "react";
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
        
    card: {
        display: 'flex',
        minHeight: 64,
        maxWidth: '480px',
        margin: 0,
        boxSizing: "border-box",

        padding: "16",
        flexGrow: 1,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center",
		flexDirection: "column",
    },

});

export default function SofaCard(props) {
    
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent className={classes.content} >
                {props.children}
            </CardContent>
        </Card>
    );
}
