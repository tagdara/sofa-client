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
            button: "#fff",
            selectButton: deepOrange[300],
            hover: deepOrange[100],
            hover2: "rgba(255, 87, 34, 0.1)",
            card: "#efefef",
            area: "#ddd",
            header: "#e8e8e8",
        },
        dot: {
            off: "#bbb",
            on: deepOrange[500],
        },
        avatar: {
            normal: deepOrange[500],
            off: "#aaa",
            on: deepOrange[500],
            notready: "#bbb",
            closed: "#6a6",
            open: "#e66",
            cool: "#00796B",
            mid: "#558B2F",
            hot: "#E65100",
            good: "#558B2F",
            fair: "#E65100",
            bad: "#E60000", 
            none: "rgba(255,255,255, 0)",
        },
        layer: {
            body: "#ccc",
            section: "#ddd",
            card: "#e8e8e8",
            item: "#eee",
            itemHighlight: "#f4f4f4",
        },

        type: "light"
    }
})
