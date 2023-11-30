export interface IUserProfile {
  fullName: string;
  _id: string;
  avatar: string;
  role: string;
  email: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  boards?: {
    active: string | null,
    finalized: string | null
  };
  __v: number;
  token: string;
}

export interface IUserLocalProfile {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  avatar: string;
  token: string;
  currentBoardId: string;
  currentBoardName: string;
}

export interface ICurrentBoardDetails {
  currentBoardId?: string;
  currentBoardName?: string
}

export interface IUserPermissions {
  isTimerAvailable: boolean;
  timeToComlete: number;
}
