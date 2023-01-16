import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerformancesService } from './performances.service';
import { CreatePerformanceDto, UpdatePerformanceDto } from 'src/types/index';
import { Account } from '@prisma/client';

@Controller('performances')
export class PerformancesController {
  constructor(private readonly performancesService: PerformancesService) { }

  @Post()
  create(@Body() createPerformanceDto: CreatePerformanceDto) {
    return this.performancesService.create(createPerformanceDto);
  }

  @Get()
  findAll() {
    return this.performancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performancesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerformanceDto: UpdatePerformanceDto) {
    return this.performancesService.update(id, updatePerformanceDto);
  }

  @Patch('hire/:id')
  hirePerformer(
    @Param('id')
    id: string,
    @Body('performer')
    performer: Account
  ) {
    return { id, performer };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.performancesService.remove(id);
  }
}
