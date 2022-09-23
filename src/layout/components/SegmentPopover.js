import React, { useState } from 'react';
import CardPopover from 'layout/components/CardPopover'
import Segment from 'layout/components/Segment'

const SegmentPopover = props => {

    const [ open, setOpen ] = useState(false)

    const togglePopover = () => { setOpen(!open) }

    return (
        <CardPopover
                width={props.width}
                minWidth={props.minWidth}
                opened={ open }
                setOpen={ setOpen }
                target={ <Segment {...props} onClick={togglePopover} />}
        >
            { props.popOver }
        </CardPopover>
    );
}

export default SegmentPopover

