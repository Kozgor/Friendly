export interface IUserProfile {
  fullName: string;
  _id: string;
  avatar: string;
  role: string;
  email: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}

export interface IUserLocalProfile {
  fullName: string;
  role: string;
  avatar: string;
  token: string;
}
