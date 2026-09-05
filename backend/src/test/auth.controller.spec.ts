import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: {
    register: jest.Mock;
    login: jest.Mock;
    getMe: jest.Mock;
  };

  beforeEach(() => {
    authService = {
      register: jest.fn(),
      login: jest.fn(),
      getMe: jest.fn(),
    };
    controller = new AuthController(authService as unknown as AuthService);
  });

  it('delegates register', async () => {
    const payload = { email: 'a@b.com', password: 'password123', name: 'A' };
    authService.register.mockResolvedValue({ access_token: 't', userId: '1' });

    await controller.register(payload);
    expect(authService.register).toHaveBeenCalledWith(payload);
  });

  it('delegates login', async () => {
    const payload = { email: 'a@b.com', password: 'password123' };
    authService.login.mockResolvedValue({ access_token: 't', userId: '1' });

    await controller.login(payload);
    expect(authService.login).toHaveBeenCalledWith(payload);
  });

  it('reads the current user from the Authorization header', async () => {
    authService.getMe.mockResolvedValue({ userId: '1', email: 'a@b.com' });

    await controller.me('Bearer jwt-token');
    expect(authService.getMe).toHaveBeenCalledWith('Bearer jwt-token');
  });
});
