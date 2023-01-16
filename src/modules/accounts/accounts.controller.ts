import { Body, Controller, HttpCode, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, UpdateAccountDto } from 'src/types';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService
  ) { }

  @Get(':id')
  @HttpCode(200)
  async getAccount(
    @Param('id')
    id: string) {
    const result = await this.accountsService.getAccount(id, {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      Performer: {
        select: {
          id: true,
          characters: true,
          performances: true,
          performanceHistory: true,
        }
      },
      Director: {
        select: {
          id: true,
          performance: true,
        }
      },
      CastingDirector: {
        select: {
          id: true,
          performance: true,
        }
      },
    });
    if(!result) throw new HttpException({ error: 'account not found' }, HttpStatus.BAD_REQUEST);

    return result;
  }

  @HttpCode(201)
  @Post()
  async registerAccount(
    @Body('account')
    account: CreateAccountDto
  ) {
    return await this.accountsService.createAccount(account, {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      Performer: true,
      Director: true,
      CastingDirector: true,
    });
  }

  @HttpCode(200)
  @Get()
  async getAllAccounts() {
    return await this.accountsService.findAll({
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      Performer: {
        select: {
          id: true,
          characters: true,
          performances: true,
          performanceHistory: true,
        }
      },
      Director: {
        select: {
          id: true,
          performance: true,
        }
      },
      CastingDirector: {
        select: {
          id: true,
          performance: true,
        }
      },
    });
  }

  @HttpCode(200)
  @Patch(':id')
  async updateAccount(
    @Param('id')
    id: string,
    @Body('account')
    account: UpdateAccountDto
  ) {
    return await this.accountsService.updateAccount(id, account, {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      Performer: {
        select: {
          id: true,
          characters: true,
          performances: true,
          performanceHistory: true,
        }
      },
      Director: {
        select: {
          id: true,
          performance: true,
        }
      },
      CastingDirector: {
        select: {
          id: true,
          performance: true,
        }
      },
    });
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteAccount(
    @Param('id')
    id: string
  ) {
    return await this.accountsService.deleteAccount(id);
  }
}