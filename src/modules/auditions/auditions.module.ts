import { Module } from '@nestjs/common';
import { AuditionsService } from './auditions.service';
import { AuditionsController } from './auditions.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuditionsController],
  providers: [AuditionsService]
})
export class AuditionsModule { }
