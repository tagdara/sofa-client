import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import yellow from '@material-ui/core/colors/yellow';

export default createMuiTheme({
    direction: "ltr",
    spacing: 8,
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
            button: "#333",
            hoverButton: "#555",
            selectButton: deepOrange[900],
            hoverSelectButton: deepOrange[700],
            page: "#111",
            hover: "rgba(188, 54, 12, 0.1)",
            paper: "#222",
            card: "#262626",
            area: "#000",
        },
        dot: {
            disabled: "#444",
            on: deepOrange[500],
            more: "rgba(191, 54, 12, 0.4)",
            off: "#444",
        },
        avatar: {
            normal: deepOrange[500],
            off: "#444",    
            on: deepOrange[500],
            notready: "#bbb",
            closed: "#6a6",
            open: "#e66",
            auto: "#777777",
            heat: "#E65100",
            cool: "#00796B",
            mid: "#558B2F",
            hot: "#E65100",
            good: "#558B2F",
            fair: "#E65100",
            bad: "#E60000",     
            none: "rgba(0,0,0, 0)",
        },
        layer: {
            body: "#000",
            section: "#111",
            card: "#222",
            item: "#272727",
            itemHighlight: "#333",
        },
        type: "dark",
    }
});
