import { combineReducers } from 'redux';
import folderReducer, { IFolderReducerState } from './folderReducer';
import emailReducer, { IEmailReducerState } from './emailReducer';

const mainReducer = combineReducers({
  folderReducer,
  emailReducer,
});

export interface IState {
  folderReducer: IFolderReducerState,
  emailReducer: IEmailReducerState
}

export default mainReducer;
