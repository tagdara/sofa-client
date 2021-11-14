import { createTheme } from '@mui/material/styles';
import deepOrange from '@mui/material/colors/deepOrange';
import yellow from '@mui/material/colors/yellow';
import blue from '@mui/material/colors/blue';

const DarkTheme = createTheme({
    direction: "ltr",
    spacing: 8,
    palette: {
        xprimary: {
            light: blue[300],
            main: blue[500],
            dark: blue[700]
        },
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
            paper: "#222",
        },
        mode: "dark",
    }
});

export default DarkTheme
