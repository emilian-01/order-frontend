export interface User {
  id: number;
  is_superuser: boolean;
  username: string;
  email: string;
  is_active: boolean;
}

export class UserForCreate {
  username: string;
  email: string;
  password: string;

  public constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
