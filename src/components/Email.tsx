import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import Fade from '@material-ui/core/Fade';
import clx from 'clsx';
import { IState } from '../reducers';
import { IEmail } from '../reducers/emailReducer';
import { emailActions } from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    minHeight: 500,
  },
  emailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '70px',
  },
  actionButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  alignCenter: {
    textAlign: 'center'
  },
}));

interface IEmailProps {
  email: IEmail | null,
  changeEmailReadStatus: (arg0: number) => void,
  deleteEmail: (arg0: number) => void,
}

const Email = ({ email, changeEmailReadStatus, deleteEmail }: IEmailProps) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!email) {
    return (
      <Paper className={clx(classes.root, classes.alignCenter)}>
        
      </Paper>
    )
  };
  const onDeleteEmail = () => {
    setAnchorEl(null);
    deleteEmail(email.id);
  }
  return (
    <Paper className={classes.root}>
      <Box className={classes.emailHeader}>
        <Typography variant="h6" component="h6" gutterBottom>
          { email.from }
        </Typography>
        <Box className={classes.actionButtonsContainer}>
          <Switch
            checked={email.read}
            onChange={() => changeEmailReadStatus(email.id)}
            color="primary"
          />
          <IconButton aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
            <MoreHorizIcon color="action" />
          </IconButton>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={onDeleteEmail}>
                <DeleteSweepIcon />
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          { email.subject }
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" gutterBottom>
          { email.body }
        </Typography>
      </Box>
    </Paper>
  );
};

const activeEmailSelector = (state: IState): IEmail| null => {
  const { emailReducer: { activeEmail, emailsById } } = state;
  return (activeEmail && emailsById[activeEmail]) || null;
};

function mapStateToProps(state: IState) {
  return {
    email: activeEmailSelector(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    changeEmailReadStatus: (emailId: number) => dispatch(emailActions.changeEmailReadStatus(emailId)),
    deleteEmail: (emailId: number) => dispatch(emailActions.deleteEmail(emailId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Email);
