import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';
// import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { isAuthenticated } from '../../../shared/http/middlewares/isAuthenticated';
// import { ensureExternalUser } from '@shared/http/middlewares/ensureExternalUser';
import { ensureExternalUser } from '../../../shared/http/middlewares/ensureExternalUser';

const productsRouter = Router();
const productsController = new ProductsController();

/**
 * @openapi
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

productsRouter.post('/', isAuthenticated, productsController.create);

/**
 * @openapi
 * /products/external-users:
 *   post:
 *     summary: Cria um novo produto (usuários externos)
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - price
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro ao criar produto
 */
productsRouter.post(
  '/external-users',
  ensureExternalUser,
  productsController.create,
);
productsRouter.post('/run', isAuthenticated, productsController.runSeeds);
productsRouter.post('/undo', isAuthenticated, productsController.undoSeeds);
productsRouter.get('/', isAuthenticated, productsController.findAll);

/**
 * @openapi
 * /products/external-users:
 *   get:
 *     summary: Lista todos os produtos (usuários externos)
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *       500:
 *         description: Erro ao listar produtos
 */
productsRouter.get(
  '/external-users',
  ensureExternalUser,
  productsController.findAll,
);
productsRouter.get('/logs', isAuthenticated, productsController.viewLogs);
productsRouter.get('/:id', isAuthenticated, productsController.findById);
productsRouter.put('/:id', isAuthenticated, productsController.update);
productsRouter.delete('/:id', isAuthenticated, productsController.delete);
productsRouter.delete('/', isAuthenticated, productsController.deleteAll);

export default productsRouter;
