import { SET_ACTIVE_FOLDER } from './actionTypes';
import { IBaseAction } from './index';

const setActiveFolderAction = (folderId: number): IBaseAction => ({
  type: SET_ACTIVE_FOLDER,
  payload: folderId,
});


export default {
  setActiveFolderAction,
};
