import { Injectable } from '@nestjs/common';
import { CreatePerformanceDto, UpdatePerformanceDto } from 'src/types';

@Injectable()
export class PerformancesService {
  create(createPerformanceDto: CreatePerformanceDto) {
    return { createPerformanceDto };
  }

  findAll() {
    return `This action returns all performances`;
  }

  findOne(id: string) {
    return `This action returns a #${id} performance`;
  }

  update(id: string, updatePerformanceDto: UpdatePerformanceDto) {
    return { id, updatePerformanceDto };
  }

  remove(id: string) {
    return `This action removes a #${id} performance`;
  }
}
