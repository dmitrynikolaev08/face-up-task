import { Router } from 'express';
import { InstitutionController } from '../controllers/InstitutionController';
import { GetInstitutionsUseCase } from '../../useCases/institution/GetInstitutions';
import { PrismaInstitutionRepository } from '../../infrastructure/repositories/PrismaInstitutionRepository';

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
 */

const institutionRouter = Router();
const institutionRepository = new PrismaInstitutionRepository();
const getInstitutionsUseCase = new GetInstitutionsUseCase(
  institutionRepository,
);
const institutionController = new InstitutionController(getInstitutionsUseCase);

institutionRouter.get('/', (req, res) =>
  institutionController.execute(req, res),
);

export { institutionRouter };
