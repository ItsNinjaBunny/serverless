import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { PerformancesModule } from './performances/performances.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    }),
    AccountsModule,
    PerformancesModule,
  ]
})
export class AppModule { }
