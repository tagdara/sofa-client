
import { createTheme } from '@mui/material/styles';
import deepOrange from '@mui/material/colors/deepOrange';
import yellow from '@mui/material/colors/yellow';

const LightTheme = createTheme({
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
            paper: "#eee",
        },
        mode: "light"
    }
})

export default LightTheme