import { Inject, Injectable } from '@nestjs/common';
import { CreateAuditionDto, UpdateAuditionDto } from 'src/types';
import { Prisma } from 'prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditionsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) { }

  async create(createAuditionDto: CreateAuditionDto, options: Prisma.AuditionSelect) {
    const { cast, castingDirector, director, performance, venue, ...audition } = createAuditionDto;

    if(audition.dates) {
      audition.dates.forEach((date, index) => audition.dates[index] = new Date(date));
    } else audition.dates = [];

    const { id, apt, ...address } = venue;

    return await this.prisma.audition.create({
      data: {
        ...audition,
        performance: {
          connect: {
            id: performance.id
          }
        },
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
        auditionCharacters: {
          create: cast
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
      }, select: options,
    });
  }

  async findAll(options: Prisma.AuditionSelect) {
    return await this.prisma.audition.findMany({ select: options });
  }

  async findOne(id: string, options: Prisma.AuditionSelect) {
    return await this.prisma.audition.findUnique({
      where: {
        id: id,
      }, select: options
    })
  }

  async update(id: string, updateAuditionDto: UpdateAuditionDto, options: Prisma.AuditionSelect) {
    const { cast, castingDirector, director, performance, dates, venue, ...audition } = updateAuditionDto;

    if(dates) dates.forEach((date, index) => dates[index] = new Date(date));

    // if(cast) {
    //   await this.prisma.auditionCharacters.update({
    //     where: { auditionId: id },
    //     data: cast
    //   });
    // }

    return await this.prisma.audition.update({
      where: {
        id: id
      }, data: {
        ...audition,
        dates: dates,
        castingDirector: {
          update: {
            ...castingDirector
          }
        },
        auditionCharacters: {
          create: cast
        },
        venue: {
          update: {
            ...venue
          }
        },
      }, select: options
    });
  }

  async remove(id: string) {
    await this.prisma.audition.update({
      where: { id: id },
      data: {
        auditionCharacters: {
          deleteMany: {
            auditionId: id
          }
        }
      }
    });

    return await this.prisma.audition.delete({
      where: { id: id }
    });
  }
}
