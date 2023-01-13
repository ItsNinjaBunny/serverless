import { Inject, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto, UpdateAccountDto, } from 'src/types';
import { hash } from '../functions/index';
import cuid from 'cuid';

@Injectable()
export class AccountsService {

  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService
  ) { }

  async getAccount(id: string): Promise<Account> {
    return await this.prisma.account.findUnique({ where: { id: id } });
  }

  async createAccount(account: CreateAccountDto) {
    const { password, person } = account;
    const { type, ...info } = person;
    const typeInfo = this.getType(type);


    return await this.prisma.account.create({
      data: {
        password: await hash(password, 10),
        person: {
          create: {
            ...info,
            ...typeInfo,
          }
        }
      }
    });
  }

  async findAll(): Promise<Account[]> {
    return await this.prisma.account.findMany();
  }

  async updateAccount(id: string, account: UpdateAccountDto) {
    const { password, ...person } = account;
    return await this.prisma.account.update({
      where: {
        id: id
      },
      data: {
        password,
        person: {
          update: {
            ...person,
          }
        }
      }
    })
  }

  async deleteAccount(id: string) {
    return await this.prisma.account.delete({
      where: {
        id: id
      }
    });
  }

  private getType(type: 'performer' | 'director' | 'casting director') {
    switch (type) {
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