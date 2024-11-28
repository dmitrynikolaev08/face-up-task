import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { GetInstitutionsUseCase } from '../../useCases/institution/GetInstitutions';
import { GetInstitutionByIdUseCase } from '../../useCases/institution/GetInstitutionById';

export class InstitutionController extends BaseController {
  constructor(
    private getInstitutionsUseCase: GetInstitutionsUseCase,
    private getInstitutionByIdUseCase: GetInstitutionByIdUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      switch (req.method) {
        case 'GET':
          if (req.params.id) {
            const institution = await this.getInstitutionByIdUseCase.execute(
              req.params.id,
            );
            if (!institution) {
              this.notFound(res, 'Institution not found');
              return;
            }
            this.ok(res, institution);
          } else {
            const institutions = await this.getInstitutionsUseCase.execute();
            this.ok(res, institutions);
          }
          break;

        default:
          this.clientError(res, 'Method not supported');
      }
    } catch (err) {
      throw err;
    }
  }
}
