import { Module } from '@nestjs/common';
import { AuditionService } from './audition.service';
import { AuditionController } from './audition.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuditionController],
  providers: [AuditionService]
})
export class AuditionModule { }
