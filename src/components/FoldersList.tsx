import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Inbox from '@material-ui/icons/Inbox';
import NearMe from '@material-ui/icons/NearMe';
import Drafts from '@material-ui/icons/Drafts';
import MoveToInbox from '@material-ui/icons/MoveToInbox';
import { IFolder } from '../reducers/folderReducer';

const icons:{ [index:string] : any} = {
  Inbox,
  NearMe,
  Drafts,
  MoveToInbox,
  default: DashboardIcon,
};

const renderIcon = (iconName: string) => {
  const Icon = icons[iconName];
  return <Icon />;
};

interface IFolderProps {
  folder: IFolder,
  setActiveFolder: (arg0: number) => void,
  activeFolderId: number,
}

const Folder = ({ folder, setActiveFolder, activeFolderId }: IFolderProps) => {
  return (
    <ListItem
      selected={activeFolderId === folder.id}
      onClick={() => setActiveFolder(folder.id)}
      button
    >
      <ListItemIcon>
        { renderIcon(folder.icon) }
      </ListItemIcon>
      <ListItemText primary={folder.name} />
    </ListItem>
  );
};

interface IFolderListProps {
  folders: IFolder[],
  setActiveFolder: (arg0: number) => void;
  activeFolderId: number
}

const FoldersList = ({ folders, setActiveFolder, activeFolderId }: IFolderListProps) => (
  <List>
    { folders.map((folder: IFolder) => (
      <Folder
        key={folder.id}
        folder={folder}
        setActiveFolder={setActiveFolder}
        activeFolderId={activeFolderId}
      />
    ))}
  </List>
);

export default FoldersList;
