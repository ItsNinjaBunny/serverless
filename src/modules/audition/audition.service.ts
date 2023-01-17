import { Injectable } from '@nestjs/common';
import { CreateAuditionDto, UpdateAuditionDto } from 'src/types';

@Injectable()
export class AuditionService {
  create(createAuditionDto: CreateAuditionDto) {
    return createAuditionDto;
  }

  findAll() {
    return `This action returns all audition`;
  }

  findOne(id: string) {
    return `This action returns a #${id} audition`;
  }

  update(id: string, updateAuditionDto: UpdateAuditionDto) {
    return { id, updateAuditionDto };
  }

  remove(id: string) {
    return `This action removes a #${id} audition`;
  }
}
