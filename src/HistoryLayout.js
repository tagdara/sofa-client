import React from 'react';
import { useState, useEffect } from 'react';
import { withData } from './DataContext/withData';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import HistoryLine from './HistoryLine';
import GridBreak from './GridBreak';


function HistoryLayout(props) {

    const [history, setHistory] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        props.getHistoryForDevice(props.endpointId, props.property,0).then(result => setHistory(result))
    }, []);
    

    function getMore() {
        setPage(page+1)
        props.getHistoryForDevice(props.endpointId, props.property, page).then(result => setHistory([...history, ...result]))
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Device History for "+props.name} />
            { history.map((event, idx) =>
                <HistoryLine key={ idx} val={event[props.property]} time={ event.time } />
            )}
            <GridBreak>
                <Button onClick={ () => getMore() }>
                    More
                </Button>
            </GridBreak>
        </React.Fragment>
    )

};

export default withData(HistoryLayout);