import React, { useRef, useEffect} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import MailIcon from '@material-ui/icons/Mail';
import { emailActions } from '../actions';
import emailSelectors from '../selectors/emailSelectors';
import { IState } from '../reducers';
import { IEmail } from '../reducers/emailReducer';

const useListItemStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'flex-end',
  },
}));

interface IEmailListItemProps {
  emailId: number,
  email: IEmail,
  deleteEmail: (arg0: number) => void,
  setActiveEmail: (arg0: number) => void,
  changeEmailReadStatus: (arg0: number) => void,
  isEmailActive: boolean,
}
const EmailListItem = ({ email, deleteEmail, isEmailActive, setActiveEmail, changeEmailReadStatus }: IEmailListItemProps) => {
  const classes = useListItemStyles();

  const containerElem = useRef<HTMLInputElement>(null);
  useEffect(() => {
      if (window.require) {
        const remote = window.require('electron').remote
        const { Menu, MenuItem, getCurrentWindow } = remote;
        const ctxMenu = new Menu();
        const deleteMenuItem = new MenuItem({
          label: 'Delete Email',
          click: () => deleteEmail(email.id)
        });
        const markAsReadMenuItem = new MenuItem({
          label: `Mark As ${email.read? 'Read': 'Unread'}`,
          click: () => changeEmailReadStatus(email.id)
        });

        ctxMenu.append(markAsReadMenuItem);
        ctxMenu.append(deleteMenuItem);

        const eventListenerCallback = (e: Event) => {
          e.preventDefault();
          ctxMenu.popup({ window: getCurrentWindow() });
        }
        if (containerElem && containerElem.current) {
          const current = containerElem.current;
          current.addEventListener('contextmenu', eventListenerCallback, false);
          return () => {
            current.removeEventListener('contextmenu', eventListenerCallback);
          };
        }

      }
  })

  return (
    <div ref={containerElem}>
      <ListItem selected={ isEmailActive }key={email.id} button onClick={() => setActiveEmail(email.id)}>
        <ListItemText
          primary={email.from}
          secondary={email.subject}
        />
        <ListItemIcon className={classes.root}>
          {
            email.read
              ? <DraftsIcon />
              : <MailIcon />
          }
        </ListItemIcon>
      </ListItem>
    </div>
  );
};

function mapStateToProps(state: IState, ownProps: any) {
  return {
    isEmailActive: emailSelectors.isEmailActiveSelector(state, ownProps.emailId),
    email: state.emailReducer.emailsById[ownProps.emailId]
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setActiveEmail: (emailId: number) => dispatch(emailActions.setActiveEmail(emailId)),
    deleteEmail: (emailId: number) => dispatch(emailActions.deleteEmail(emailId)),
    changeEmailReadStatus: (emailId: number) => dispatch(emailActions.changeEmailReadStatus(emailId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailListItem);
