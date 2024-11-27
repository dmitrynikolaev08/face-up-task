import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { GetInstitutionsUseCase } from '../../useCases/institution/GetInstitutions';

export class InstitutionController extends BaseController {
  constructor(private getInstitutionsUseCase: GetInstitutionsUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      switch (req.method) {
        case 'GET':
          const institutions = await this.getInstitutionsUseCase.execute();
          this.ok(res, institutions);
          break;

        default:
          this.clientError(res, 'Method not supported');
      }
    } catch (err) {
      throw err;
    }
  }
}
