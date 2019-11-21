import { createSelector } from 'reselect'
import { IState } from '../reducers';
import { IEmail } from '../reducers/emailReducer';

const activeFolderSelector = (state: IState) => state.folderReducer.activeFolder;
const activeEmailSelector = (state: IState) => state.emailReducer.activeEmail;
const allEmailIdsSelector = (state: IState) => state.emailReducer.allEmailIds;
const emailsByIdSelector = (state: IState) => state.emailReducer.emailsById;

const getEmailsForFolderSelector = createSelector(
  activeFolderSelector,
  allEmailIdsSelector,
  emailsByIdSelector,
  (activeFolder, allEmailIds, emailsById) => {
    return allEmailIds.reduce((acc: IEmail[], emailId: number) => {
      const email = emailsById[emailId];
      if (email.folders.includes(activeFolder)) {
        acc.push(email);
      }
      return acc;
    }, []);
})

const isEmailActiveSelector = createSelector(
  (state: IState, emailId: number) => emailId,
  activeEmailSelector,
  (emailId, activeEmailId) => emailId === activeEmailId
)

export default {
  getEmailsForFolderSelector,
  isEmailActiveSelector
}