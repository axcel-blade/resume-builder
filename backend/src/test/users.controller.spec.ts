import { UsersController } from '../users/users.controller';
import { AuthService } from '../auth/auth.service';

describe('UsersController', () => {
  let controller: UsersController;
  let authService: { getMe: jest.Mock };

  beforeEach(() => {
    authService = { getMe: jest.fn().mockResolvedValue({ userId: '1', email: 'a@b.com' }) };
    controller = new UsersController(authService as unknown as AuthService);
  });

  it('reads the profile from the Authorization header', async () => {
    await controller.getProfile('Bearer abc');
    expect(authService.getMe).toHaveBeenCalledWith('Bearer abc');
  });

  it('updateProfile authenticates with the same header', async () => {
    await controller.updateProfile('Bearer abc', { name: 'New Name' });
    expect(authService.getMe).toHaveBeenCalledWith('Bearer abc');
  });
});
