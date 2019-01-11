import React, {Component} from "react";
import { withThemeChange } from '../DataContext/withThemeChange';
import { ThemeProvider } from "@material-ui/styles";

export class ThemeWrapper extends Component {

    render(){
        return (
            <ThemeProvider theme={this.props.getTheme(this.props.colorScheme)}>
                { this.props.children }
            </ThemeProvider>
        )
    }
}

export default withThemeChange(ThemeWrapper);
