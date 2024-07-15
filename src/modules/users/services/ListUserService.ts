import { User } from '@modules/users/models/userModel';

export class ListUsersService {
  async execute(): Promise<User[]> {
    const users = await User.findAll();
    return users;
  }
}
