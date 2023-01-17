import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePerformanceDto, UpdatePerformanceDto } from 'src/types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PerformancesService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService
  ) { }

  async create(createPerformanceDto: CreatePerformanceDto, options: Prisma.PerformanceSelect) {
    const { director, castingDirector, cast, venue, ...performance } = createPerformanceDto;
    const { id, apt, ...address } = venue;

    if(performance.dates) {
      performance.dates.forEach((date, index) => performance.dates[index] = new Date(date));
    } else performance.dates = [];

    return await this.prisma.performance.create({
      data: {
        ...performance,
        director: {
          connect: {
            id: director.id
          }
        },
        castingDirector: {
          connect: {
            id: castingDirector.id
          }
        },
        venue: {
          connectOrCreate: {
            where: {
              id: id ? id : undefined,
            },
            create: {
              street: apt ? `${address.street} ${apt}` : address.street,
              city: address.city,
              state: address.state,
              postalCode: address.postalCode,
            }
          }
        },
        cast: {
          create: cast
        }
      }, select: options
    });
  }

  async findAll(options: Prisma.PerformanceSelect) {
    return await this.prisma.performance.findMany({
      select: options
    });
  }

  async findOne(id: string, options: Prisma.PerformanceSelect) {
    return await this.prisma.performance.findUnique({
      where: {
        id: id
      }, select: options
    })
  }

  async findByTitle(title: string, options: Prisma.PerformanceSelect) {
    return await this.prisma.performance.findMany({
      where: {
        name: {
          contains: title,
          mode: 'insensitive'
        }
      }, select: options,
    });
  }

  async update(id: string, updatePerformanceDto: UpdatePerformanceDto, options: Prisma.PerformanceSelect) {
    const { director, castingDirector, cast, venue, ...performance } = updatePerformanceDto;
    return await this.prisma.performance.update({
      where: {
        id: id
      }, data: {
        ...performance,
        director: {
          update: {
            ...director
          }
        }, castingDirector: {
          update: {
            ...castingDirector
          }
        }, cast: {
          updateMany: {
            where: {
              performanceId: id
            },
            data: {
              ...cast
            }
          }
        }, venue: {
          update: venue
        }
      }, select: options
    })
  }

  async remove(id: string) {

    await this.prisma.performance.update({
      where: {
        id: id
      }, data: {
        cast: {
          deleteMany: {
            performanceId: id
          }
        },
        venue: {
          disconnect: true
        }
      }
    });

    return await this.prisma.performance.delete({ where: { id: id } });
  }
}
