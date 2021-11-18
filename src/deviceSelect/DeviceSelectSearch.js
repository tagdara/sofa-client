import React, {useState} from 'react';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import debounce from 'lodash/debounce';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
const useStyles = makeStyles(theme => {
    return {
        xtextField: {
            backgroundColor: theme.palette.background.default,
            borderRadius: 4,
            padding: 4,
        }
    }
});


const DeviceSelectSearch = props => {
    
    const classes = useStyles();
    const delayedSearch = debounce(q => props.setSearchValue(q), 500);
    const [ search, setSearch ]=useState(props.searchValue)
    
    function handleChange(newsearch) {
        setSearch(newsearch)
        delayedSearch(newsearch)
    }

    return (
        <TextField
            className={classes.textField}
            autoFocus
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
            fullWidth
            label={'Search'}
            value={search}
            size="small"
            onChange={(e) => handleChange(e.target.value)}
        />
    )
}
export default DeviceSelectSearch