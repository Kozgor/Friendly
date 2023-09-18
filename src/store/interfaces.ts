import { IUserProfile } from '../interfaces/user';

export interface RootStateInterface {
  user: IUserProfile;
}

export interface AddToStoreAction {
  type: 'addUser'
  user: IUserProfile
}
export interface RemoveFromStoreAction {
  type: 'removeUser'
  user: IUserProfile
}
