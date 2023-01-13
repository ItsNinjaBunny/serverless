import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, UpdateAccountDto } from 'src/types';

@Controller('accounts')
export class AccountsController {
  private readonly logger: Logger;
  constructor(
    private readonly accountsService: AccountsService
  ) {
    this.logger = new Logger(AccountsController.name);
  }

  @Get(':id')
  async getAccount(
    @Param('id')
    id: string) {
    const result = await this.accountsService.getAccount(id);
    if (!result) throw new HttpException({ error: 'account not found' }, HttpStatus.BAD_REQUEST);

    return result;
  }

  @Post()
  async registerAccount(
    @Body('account')
    account: CreateAccountDto
  ) {
    return await this.accountsService.createAccount(account);
  }

  @Get()
  async getAllAccounts() {
    return await this.accountsService.findAll();
  }

  @Patch(':id')
  async updateAccount(
    @Param('id')
    id: string,
    @Body('account')
    account: UpdateAccountDto
  ) {
    return await this.accountsService.updateAccount(id, account);
  }

  @Delete(':id')
  async deleteAccount(
    @Param('id')
    id: string
  ) {
    return await this.accountsService.deleteAccount(id);
  }
}