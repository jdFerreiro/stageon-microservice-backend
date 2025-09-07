import { Global, Injectable } from '@nestjs/common';

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleIds: string[];
  roleNames: string[];
}

@Global()
@Injectable()
export class UserContext {
  private user: IUser | null = null;

  getUser(): IUser | null {
    return this.user;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  clear() {
    this.user = null;
  }
}
