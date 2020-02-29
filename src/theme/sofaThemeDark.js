import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import yellow from '@material-ui/core/colors/yellow';

export default createMuiTheme({
    direction: "ltr",
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
        text: {
            primary: "#c0c0c0",
        },
        background: {
            default: "#000",
            page: "#111",
            hover: "rgba(188, 54, 12, 0.1)",
            paper: "#222",
            card: "#262626",
        },
        dot: {
            off: "#444",
            on: deepOrange[500],
        },
        avatar: {
            normal: deepOrange[500],
            off: deepOrange[700],    
            on: deepOrange[500],
            notready: "#bbb",
            closed: "#6a6",
            open: "#e66",
            cool: "#00796B",
            mid: "#558B2F",
            hot: "#E65100",
        },
        type: "dark",
    }
});
