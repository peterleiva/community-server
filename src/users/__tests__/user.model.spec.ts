import UserFactory from '../__mocks__/user';
import databaseSetup from 'test/helpers/database';
import { UserModel } from 'users';

describe('User', () => {
  databaseSetup();

  it('Create successfuly', async () => {
    const user = new UserModel(UserFactory.build());
    await expect(user.save()).resolves.toBe(user);
  });
});
