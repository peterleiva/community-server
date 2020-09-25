import UserFactory from 'test/factories/user';
import { UserModel } from 'src/users';
import databaseSetup from 'test/utils/database';

describe('User', () => {
  databaseSetup();

  it('Create successfuly', async () => {
    const user = new UserModel(UserFactory.build());
    await expect(user.save()).resolves.toBe(user);
  });
});
