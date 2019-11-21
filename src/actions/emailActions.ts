import { SET_ACTIVE_EMAIL, EMAIL_CHANGE_READ_STATUS, EMAIL_DELETE } from './actionTypes';
import { IBaseAction } from './index';

const setActiveEmail = (emailId: number): IBaseAction => ({
  type: SET_ACTIVE_EMAIL,
  payload: emailId,
});

const changeEmailReadStatus = (emailId: number): IBaseAction => ({
  type: EMAIL_CHANGE_READ_STATUS,
  payload: emailId,
});

const deleteEmail = (emailId: number): IBaseAction => ({
  type: EMAIL_DELETE,
  payload: emailId,
});

export default {
  setActiveEmail,
  changeEmailReadStatus,
  deleteEmail,
};
