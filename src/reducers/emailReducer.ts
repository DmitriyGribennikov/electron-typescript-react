import {
  SET_ACTIVE_EMAIL,
  SET_ACTIVE_FOLDER,
  EMAIL_CHANGE_READ_STATUS,
  EMAIL_DELETE,
} from '../actions/actionTypes';
import { IBaseAction } from '../actions';
import EmailMocks from './emailMocks';

export interface IEmail{
  id: number,
  date: number,
  from: string,
  subject: string,
  body: string,
  read: boolean,
  delete: boolean,
  folders: number[]
}

export interface IEmailReducerState {
  emailsById: {
    [index: number]: IEmail
  },
  allEmailIds: number[],
  activeEmail: number|null
}

const initialState: IEmailReducerState = {
  emailsById: EmailMocks.byId,
  allEmailIds: EmailMocks.allIds,
  activeEmail: null,
};

const removeIdfromList = (emailIds: number[], emailId: number): number[] => emailIds.filter((id) => id !== emailId);

export default (state = initialState, action: IBaseAction): IEmailReducerState => {
  switch (action.type) {
    case SET_ACTIVE_FOLDER:
      return {
        ...state,
        activeEmail: null
      }
    case SET_ACTIVE_EMAIL:
      return {
        ...state,
        activeEmail: action.payload,
      };
    case EMAIL_CHANGE_READ_STATUS:
      return {
        ...state,
        emailsById: {
          ...state.emailsById,
          [action.payload]: {
            ...state.emailsById[action.payload],
            read: !state.emailsById[action.payload].read,
          },
        },
      };
    case EMAIL_DELETE:
      return {
        ...state,
        allEmailIds: removeIdfromList(state.allEmailIds, action.payload),
        activeEmail: null,
      };
    default:
      return state;
  }
};
