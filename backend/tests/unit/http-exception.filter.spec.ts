import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../../src/common/http-exception.filter';

function createHost() {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  return {
    json,
    status,
    host: {
      switchToHttp: () => ({
        getResponse: () => ({ status }),
        getRequest: () => ({ url: '/users/profile' }),
      }),
    },
  };
}

describe('HttpExceptionFilter', () => {
  const filter = new HttpExceptionFilter();

  it('maps HttpException 401 to a structured error body', () => {
    const { host, status, json } = createHost();
    filter.catch(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED ?? 401), host as any);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 401,
        path: '/users/profile',
      }),
    );
  });

  it('maps unexpected errors to 500', () => {
    const { host, status, json } = createHost();
    filter.catch(new Error('boom'), host as any);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        message: 'boom',
      }),
    );
  });
});
