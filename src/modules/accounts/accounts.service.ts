import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateAccountDto, UpdateAccountDto, } from 'src/types';
import { hash } from 'src/functions';
import * as cuid from 'cuid';

@Injectable()
export class AccountsService {

  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService
  ) { }

  async getAccount(id: string, options: Prisma.AccountSelect) {
    return await this.prisma.account.findUnique({
      where: {
        id: id
      }, select: {
        ...options
      }
    });
  }

  async createAccount(account: CreateAccountDto, options: Prisma.AccountSelect) {
    const { password, email, ...person } = account;
    const { type, ...info } = person;
    const typeInfo = this.getType(type);

    return await this.prisma.account.create({
      data: {
        ...info,
        email: email.toLowerCase(),
        password: await hash(password, 10),
        ...typeInfo
      }, select: {
        ...options
      }
    });
  }

  async findAll(options: Prisma.AccountSelect) {
    return await this.prisma.account.findMany({
      select: {
        ...options
      }
    });
  }

  async updateAccount(id: string, account: UpdateAccountDto, options: Prisma.AccountSelect) {
    return await this.prisma.account.update({
      where: {
        id: id
      },
      data: {
        ...account,
      }, select: {
        ...options
      }
    })
  }

  async deleteAccount(id: string) {
    const account = await this.getAccount(id, {
      Performer: true,
      Director: true,
      CastingDirector: true
    });
    await this.prisma.account.update({
      where: {
        id: id
      }, data: {
        Performer: {
          delete: account.Performer ? true : false
        },
        Director: {
          delete: account.Director ? true : false,
        },
        CastingDirector: {
          delete: account.CastingDirector ? true : false,
        }
      }
    });
    return await this.prisma.account.delete({
      where: {
        id: id,
      }
    });
  }

  private getType(type: 'performer' | 'director' | 'casting director') {
    switch(type) {
      case 'performer':
        return {
          Performer: {
            create: {
              id: cuid(),
            }
          }
        }
      case 'director':
        return {
          Director: {
            create: {
              id: cuid(),
            }
          }
        }
      case 'casting director':
        return {
          CastingDirector: {
            create: {
              id: cuid(),
            }
          }
        }
    }
  }
}