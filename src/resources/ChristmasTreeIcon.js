/* eslint-disable max-len */

import React from 'react';
import { SvgIcon } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { ReactComponent as ChristmasTree } from './ChristmasTree.svg';

const useStyles = makeStyles( theme => createStyles({
    treeStyle: {
        filter: `grayscale(1)`,
        opacity: 0.4,
    },
    colorTree: {
    },
}));

function ChristmasTreeIcon(props) {
    
    const classes = useStyles(); 
    
    return (
        <SvgIcon className={ props.treeOn ? classes.colorTree : classes.treeStyle } >
            <ChristmasTree />
        </SvgIcon>
    );
}

ChristmasTreeIcon.muiName = 'SvgIcon';

export default ChristmasTreeIcon;
