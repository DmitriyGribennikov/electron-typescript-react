import React, { Component } from 'react';
import clsx from 'clsx';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FoldersList from '../components/FoldersList';
import EmailsList from '../components/EmailsList';
import Email from '../components/Email';
import { IState } from '../reducers';
import { folderActions } from '../actions';
import { IFolder } from '../reducers/folderReducer';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

interface Props extends WithStyles<typeof styles> {
  folders: IFolder[],
  activeFolder: IFolder,
  setActiveFolder: (arg0: number) => void;
}

interface State {
}

const PageContainerWithStyles = withStyles(styles)(
  class MainPageContainer extends Component<Props, State> {
    state = {
      open: false,
    }
  
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      folders,
      activeFolder,
      setActiveFolder,
    } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              { activeFolder.name }
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <FoldersList
            folders={folders}
            setActiveFolder={setActiveFolder}
            activeFolderId={activeFolder.id}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper),
          }}
          open
        >
          <Divider />
          <EmailsList />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container id='custom-context-menu' maxWidth="lg" className={classes.container}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Email />
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
  },
);


function mapStateToProps(state: IState) {
  const { folderReducer: { foldersById, allFolders, activeFolder } } = state;
  return {
    folders: allFolders.map((folderId) => foldersById[folderId]),
    activeFolder: foldersById[activeFolder],
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setActiveFolder: (folderId: number) => dispatch(folderActions.setActiveFolderAction(folderId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainerWithStyles);
