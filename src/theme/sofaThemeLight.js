import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import yellow from '@material-ui/core/colors/yellow';


export default createMuiTheme({
    palette: {
        primary: {
            light: deepOrange[300],
            main: deepOrange[500],
            dark: deepOrange[700]
        },
        secondary: {
            light: yellow[300],
            main: yellow[500],
            dark: yellow[700]
        },
        background: {
            page: "#eee",
            hover: "rgba(255, 87, 34, 0.1)",
            card: "#efefef",
        },
        dot: {
            off: "#bbb",
            on: deepOrange[500],
        },
        type: "light"
    }
})
