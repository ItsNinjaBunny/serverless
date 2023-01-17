import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerformancesService } from './performances.service';
import { CreatePerformanceDto, UpdatePerformanceDto } from 'src/types/index';

@Controller('performances')
export class PerformancesController {
  constructor(private readonly performancesService: PerformancesService) { }

  @Post()
  create(@Body('performance') createPerformanceDto: CreatePerformanceDto) {
    return this.performancesService.create(createPerformanceDto, {
      id: true,
      name: true,
      dates: true,
      director: true,
      castingDirector: true,
      cast: true,
      venue: true
    });
  }

  @Get()
  findAll() {
    return this.performancesService.findAll({
      id: true,
      name: true,
      dates: true,
      director: true,
      castingDirector: true,
      cast: true,
      venue: true
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performancesService.findOne(id, {
      id: true,
      name: true,
      dates: true,
      director: true,
      castingDirector: true,
      cast: true,
      venue: true
    });
  }

  @Get('title/:title')
  findByTitle(
    @Param('title')
    title: string
  ) {
    return this.performancesService.findByTitle(title, {
      id: true,
      name: true,
      dates: true,
      director: true,
      castingDirector: true,
      cast: true,
      venue: true
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('performance') updatePerformanceDto: UpdatePerformanceDto) {
    return this.performancesService.update(id, updatePerformanceDto, {
      id: true,
      name: true,
      dates: true,
      director: true,
      castingDirector: true,
      cast: true,
      venue: true
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.performancesService.remove(id);
  }
}
