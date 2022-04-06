import { rest, RestRequest } from 'msw';

interface AuthRequestBody {
  username: string;
  password: string;
}

export const handlers = [
  rest.post('/authenticate', (req: RestRequest<AuthRequestBody>, res, context) => {
    if (req.body.username === 'user' && req.body.password === '1234') {
      return res(
        context.delay(1500),
        context.status(200),
        context.json({
          token: 'user-token',
        }),
      );
    }

    return res(
      context.delay(1500),
      context.status(401),
      context.json({
        error: 'Unauthorized',
      }),
    );
  }),
];
