import { PartialType } from '@nestjs/mapped-types';

export type Type = 'director' | 'casting director' | 'performer';

export class Person {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  type: Type;
}

export class Director extends Person {
  id: string;

  performances: Performance[];
}

export class CastingDirector extends Person {
  id: string;

  performances: Performance[];
}

export class Performer extends Person {
  id: string;

  performances: Performance[];
  performanceHistory: Performance[];
}

export class Character {
  id: number;
  name: string;
  role: 'lead' | 'supporting' | 'extra';
}

export class Venue {
  id: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  postalCode: string;
}

export class Database {
  performances: Performance[];
  people: Person[];
}

export class Account {
  id: string;
  password: string;
}

export class CreateAccountDto {
  person: Person
  password: string;

}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  id: string;
}

export class CreatePerformanceDto {
  name: string;
  director: Director;
  castingDirector: CastingDirector;
  cast: Character[];
  venue: Venue;
}

export class UpdatePerformanceDto extends PartialType(CreatePerformanceDto) {
  id: string;
}