import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import NotesIcon from '@material-ui/icons/Notes';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import { goBack, goHome, toggleDrawer, toggleRightDrawer } from 'store/layoutHelpers';
import useUserStore from 'store/userStore'
import useLayoutStore from 'store/layoutStore'

const useStyles = makeStyles((theme) => ({
	appBar: {
		boxShadow: 'none', 
	},
	toolbar: {
		borderBottom: "1px solid "+theme.palette.background.page,
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
	const loggedIn = useUserStore(state => state.logged_in)
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