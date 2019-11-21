import folderActions from './folderActions';
import emailActions from './emailActions';


export interface IBaseAction {
  type: string,
  payload: number
}

export {
  folderActions,
  emailActions,
};
