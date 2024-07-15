import { Router } from 'express';
import { InternalUserController } from '../../../modules/users/controllers/InternalUserController';
import { ExternalUserController } from '../../../modules/users/controllers/ExternalUserController';
import { UserController } from '../../../modules/users/controllers/UserController';
// import { InternalUserController } from '@modules/users/controllers/InternalUserController';
// import { ExternalUserController } from '@modules/users/controllers/ExternalUserController';
// import { UserController } from '@modules/users/controllers/UserController';
import { SessionsController } from '../controllers/SessionsController';
import { isAuthenticated } from '../../../shared/http/middlewares/isAuthenticated';
// import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const internalUserController = new InternalUserController();
const externalUserController = new ExternalUserController();
const sessionsController = new SessionsController();
const userController = new UserController();

/**
 * @openapi
 * tags:
 *   name: Usuários Externos
 *   description: Gerenciamento de usuários externos
 */

usersRouter.post('/register/internal', internalUserController.create);

/**
 * @openapi
 * /users/register/external:
 *   post:
 *     summary: Cria um novo usuário externo
 *     tags: [Usuários Externos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuário externo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: João da Silva
 *                     email:
 *                       type: string
 *                       example: joao@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *                     createdAt:
 *                       type: string
 *                       example: '2024-07-12T12:00:00Z'
 *                     updatedAt:
 *                       type: string
 *                       example: '2024-07-12T12:00:00Z'
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Erro ao criar usuário externo
 */
usersRouter.post('/register/external', externalUserController.create);

/**
 * @openapi
 * tags:
 *   name: Sessions
 *   description: User sessions
 */

/**
 * @openapi
 * /users/auth:
 *   post:
 *     summary: User login
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Incorrect email/password combination
 */
usersRouter.post('/auth', sessionsController.create);
usersRouter.get('/', isAuthenticated, userController.findAll);
usersRouter.get('/:id', isAuthenticated, userController.findById);
usersRouter.put('/:id', isAuthenticated, userController.update);
usersRouter.delete('/:id', isAuthenticated, userController.delete);

export default usersRouter;
