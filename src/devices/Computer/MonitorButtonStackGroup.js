import React from 'react';
import CardLine from 'components/CardLine';
import MonitorButtonStack from 'devices/Computer/MonitorButtonStack';
import MonitorButtonStackLabel from 'devices/Computer/MonitorButtonStackLabel';
import Spacer from 'components/Spacer';

export default function MonitorButtonStackGroup(props) {

    if (!props.buttonLayout) { return null }

    const sectionCount = Object.keys(props.buttonLayout).length;

    return (
        <CardLine>
            <MonitorButtonStackLabel outlets={props.outlets} topClick={props.topClick} bottomClick={ props.bottomClick } />
            { Object.keys(props.buttonLayout).map( (zone, i) => 
                <React.Fragment key={zone}>
                    { props.buttonLayout[zone].map( btn =>
                        <MonitorButtonStack key={btn.label} {...btn} />
                    )}
                    { i < sectionCount &&
                        <Spacer />
                    }
                </React.Fragment>
            )}
        </CardLine>
    );
}
 