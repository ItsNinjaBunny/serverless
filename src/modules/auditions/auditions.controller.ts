import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditionsService } from './auditions.service';
import { CreateAuditionDto, UpdateAuditionDto } from 'src/types';

@Controller('auditions')
export class AuditionsController {
  constructor(private readonly auditionService: AuditionsService) { }

  @Post()
  async create(
    @Body('audition')
    createAuditionDto: CreateAuditionDto) {
    return this.auditionService.create(createAuditionDto, {
      id: true,
      dates: true,
      performance: true,
      director: true,
      castingDirector: true,
      venue: true,
      auditionCharacters: true,
    });
  }

  @Get()
  async findAll() {
    return this.auditionService.findAll({
      id: true,
      dates: true,
      performance: true,
      director: true,
      castingDirector: true,
      venue: true,
      auditionCharacters: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.auditionService.findOne(id, {
      id: true,
      dates: true,
      performance: true,
      director: true,
      castingDirector: true,
      venue: true,
      auditionCharacters: true,
    });
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,
    @Body('audition')
    updateAuditionDto: UpdateAuditionDto) {
    return this.auditionService.update(id, updateAuditionDto, {
      id: true,
      dates: true,
      performance: true,
      director: true,
      castingDirector: true,
      venue: true,
      auditionCharacters: true,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.auditionService.remove(id);
  }
}
