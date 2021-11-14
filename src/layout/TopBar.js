import React from 'react';

import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import NotesIcon from '@mui/icons-material/Notes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import { goBack, goHome, toggleDrawer, toggleRightDrawer } from 'store/layoutHelpers';
import useLoginStore from 'store/loginStore'
import useLayoutStore from 'store/layoutStore'

const useStyles = makeStyles((theme) => ({
	appBar: {
		boxShadow: 'none', 
		backGroundColor: theme.palette.background.page,
	},
	toolbar: {
		borderBottom: "1px solid "+theme.palette.background.paper+" !important",
		marginBottom: 16,
	},
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function TopBar(props) {
	const classes = useStyles();
	const loggedIn = useLoginStore(state => state.logged_in)
	const currentPage = useLayoutStore(state => state.currentPage)

	return (
		<AppBar className={classes.AppBar} position="static" color="transparent" elevation={0}>
			<Toolbar className={classes.toolbar}>
				<IconButton edge="start" className={classes.menuButton} onClick={() => toggleDrawer()} color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					Home
				</Typography>
				{ loggedIn && (
					<div>
						{ currentPage !== 'Stacks' &&
							<IconButton onClick={() => goBack()}>
								<ArrowBackIcon />
							</IconButton>
						}
						{ currentPage !== 'Stacks' &&
							<IconButton onClick={() => goHome()}>
								<HomeIcon />
							</IconButton>
						}

						<IconButton onClick={() => toggleRightDrawer()}>
							<NotesIcon />
						</IconButton>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
}