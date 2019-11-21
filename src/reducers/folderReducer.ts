import {
  SET_ACTIVE_FOLDER,
} from '../actions/actionTypes';
import { IBaseAction } from '../actions';

export interface IFolder {
  id: number,
  name: string,
  icon: string
}

export interface IFolderRules {
  id: number,
  folderId: number,
  rules: []
}

export interface IFolderReducerState {
  foldersById: {
    [key: number]: IFolder
  },
  allFolders: number[],
  activeFolder: number
}

const initialState: IFolderReducerState = {
  foldersById: {
    1: {
      id: 1,
      name: 'Inbox',
      icon: 'Inbox',
    },
    2: {
      id: 2,
      name: 'Sent',
      icon: 'NearMe',
    },
    3: {
      id: 3,
      name: 'Draft',
      icon: 'Drafts',
    },
    4: {
      id: 4,
      name: 'Pinned',
      icon: 'MoveToInbox',
    },
  },
  allFolders: [1, 2, 3, 4],
  activeFolder: 1,
};

export default (state = initialState, action: IBaseAction): IFolderReducerState => {
  switch (action.type) {
    case SET_ACTIVE_FOLDER:
      return {
        ...state,
        activeFolder: action.payload,
      };
    default:
      return state;
  }
};
