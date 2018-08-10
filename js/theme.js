import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';


export default createMuiTheme({
    palette: {
        primary: deepOrange,
        secondary: indigo // Indigo is probably a good match with pink
    }
});
