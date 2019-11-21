import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dispatch } from 'redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { IState } from '../reducers';
import { IEmail } from '../reducers/emailReducer';
import emailSelectors from '../selectors/emailSelectors';
import EmailListItem from './EmailListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '64px',
  },
}));

interface IEmailListProps {
  emails: IEmail[],
}


const EmailList = ({ emails }: IEmailListProps) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {
        !emails.length && <ListItem>
          <ListItemText
            primary='No emails here, yet'
          />
        </ListItem>
      }
      {
        emails.map((email) => (<EmailListItem
            key={email.id}
            emailId={email.id}
          />
        ))
    }
    </List>
  );
};



function mapStateToProps(state: IState) {
  return {
    emails: emailSelectors.getEmailsForFolderSelector(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailList);
