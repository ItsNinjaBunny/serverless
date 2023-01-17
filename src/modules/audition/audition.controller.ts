import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditionService } from './audition.service';
import { CreateAuditionDto, UpdateAuditionDto } from 'src/types';

@Controller('audition')
export class AuditionController {
  constructor(private readonly auditionService: AuditionService) { }

  @Post()
  create(@Body() createAuditionDto: CreateAuditionDto) {
    return this.auditionService.create(createAuditionDto);
  }

  @Get()
  findAll() {
    return this.auditionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditionDto: UpdateAuditionDto) {
    return this.auditionService.update(id, updateAuditionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditionService.remove(id);
  }
}
