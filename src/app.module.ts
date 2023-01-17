import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './modules/accounts/accounts.module';
import { PerformancesModule } from './modules/performances/performances.module';
import { AuditionsModule } from './modules/auditions/auditions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    }),
    AccountsModule,
    PerformancesModule,
    AuditionsModule,
  ]
})
export class AppModule { }
