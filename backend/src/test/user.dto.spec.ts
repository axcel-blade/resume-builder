import { validate } from 'class-validator';
import { UserDto } from '../common/types/user.dto';

describe('UserDto', () => {
  it('accepts a complete user payload', async () => {
    const dto = Object.assign(new UserDto(), {
      id: '1',
      name: 'Ada',
      email: 'ada@example.com',
      avatar: null,
    });

    expect(await validate(dto)).toHaveLength(0);
  });

  it('rejects missing required fields', async () => {
    const dto = new UserDto();
    const errors = await validate(dto);
    expect(errors.map((error) => error.property).sort()).toEqual(['email', 'id', 'name']);
  });
});
