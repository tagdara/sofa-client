/* eslint-disable max-len */

import React from 'react';
import { SvgIcon, makeStyles, createStyles  } from '@material-ui/core';
import { ReactComponent as ChristmasTree } from './ChristmasTree.svg';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
