import { Router } from 'express';
import { InstitutionController } from '../controllers/InstitutionController';
import { GetInstitutionsUseCase } from '../../useCases/institution/GetInstitutions';
import { PrismaInstitutionRepository } from '../../infrastructure/repositories/PrismaInstitutionRepository';
import { GetInstitutionByIdUseCase } from '../../useCases/institution/GetInstitutionById';

/**
 * @swagger
 * components:
 *   schemas:
 *     Institution:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/institutions:
 *   get:
 *     summary: Get all institutions
 *     tags:
 *       - Institutions
 *     responses:
 *       200:
 *         description: List of institutions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Institution'
 *       500:
 *         description: Server error
 *
 * /api/institutions/{id}:
 *   get:
 *     summary: Get institution by ID
 *     tags:
 *       - Institutions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The institution ID
 *     responses:
 *       200:
 *         description: Institution found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institution'
 *       404:
 *         description: Institution not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Institution not found
 *       500:
 *         description: Server error
 */

const institutionRouter = Router();
const institutionRepository = new PrismaInstitutionRepository();
const getInstitutionsUseCase = new GetInstitutionsUseCase(
  institutionRepository,
);
const getInstitutionByIdUseCase = new GetInstitutionByIdUseCase(
  institutionRepository,
);
const institutionController = new InstitutionController(
  getInstitutionsUseCase,
  getInstitutionByIdUseCase,
);

institutionRouter.get('/', (req, res) =>
  institutionController.execute(req, res),
);
institutionRouter.get('/:id', (req, res) =>
  institutionController.execute(req, res),
);

export { institutionRouter };
