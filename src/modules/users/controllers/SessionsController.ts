import { Request, Response } from 'express';
// import { CreateSessionService } from '@modules/users/services/CreateSessionService';
import { CreateSessionService } from '../../../modules/users/services/CreateSessionService';

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionService();

    const { user, token } = await createSession.execute({ email, password });

    return response.json({ user, token });
  }
}
