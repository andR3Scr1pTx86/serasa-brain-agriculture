import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  FARMER_REPOSITORY_TOKEN,
  type IFarmerRepository,
} from '../../domain/repositories/farmer.repository.interface.js';
import {
  UpdateFarmerInputDto,
  UpdateFarmerOutputDto,
} from '../dtos/update-farmer.dto.js';
import { Document } from '../../domain/value-objects/document.vo.js';
import {
  ConflictError,
  EntityNotFoundError,
} from '../../../../shared/domain/errors/domain-errors.js';

@Injectable()
export class UpdateFarmerUseCase {
  constructor(
    @Inject(FARMER_REPOSITORY_TOKEN)
    private readonly farmerRepository: IFarmerRepository,
  ) {}

  async execute(input: UpdateFarmerInputDto): Promise<UpdateFarmerOutputDto> {
    const farmer = await this.farmerRepository.findById(input.id);

    if (!farmer) {
      throw new EntityNotFoundError('Farmer not found');
    }

    if (input.name) {
      farmer.updateName(input.name);
    }

    if (input.document && input.document !== farmer.getDocument().getValue()) {
      const newDocumentVo = Document.create(input.document);

      const documentInUse =
        await this.farmerRepository.findByDocument(newDocumentVo);

      if (documentInUse && documentInUse.getId() !== farmer.getId()) {
        throw new ConflictError(
          'This Document is already in use by another Farmer',
        );
      }

      farmer.updateDocument(newDocumentVo);
    }

    await this.farmerRepository.save(farmer);

    return {
      id: farmer.getId(),
      name: farmer.getName(),
      document: farmer.getDocument().getValue(),
      updatedAt: farmer.getUpdatedAt(),
    };
  }
}
