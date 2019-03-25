import * as React from "react";
import { DataContext } from "./DataProvider";

export function withLayout(Component) {
    return function DataComponent(props) {
        return (
            <DataContext.Consumer>
                { context => <Component {...props} {...context} context={context} 
                                setLayout={context.setLayout} layout={context.layout} layoutName={context.layoutName} setLayoutCard={context.setLayoutCard}
                                fullLayout={context.fullLayout} setLayoutPage={context.setLayoutPage} layoutPage={context.layoutPage}
                                setReturn={context.setReturn} returnName={context.returnName} returnProps={context.returnProps}
                                setBack={context.setBack} backName={context.backName} backProps={context.backProps} goBack={context.goBack}
                            /> }
            </DataContext.Consumer>
        );
    };
}
