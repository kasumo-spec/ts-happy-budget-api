import {Entity, hasMany, model, property} from '@loopback/repository';
import {Debit} from './debit.model';
import {Income} from './income.model';

@model()
export class Budget extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  monthYear: string;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
  })
  prediction: number;

  @property({
    type: 'number',
    required: true,
  })
  market: number;

  @property({
    type: 'number',
    required: true,
  })
  food: number;

  @property({
    type: 'number',
    required: true,
  })
  health: number;

  @property({
    type: 'number',
    required: true,
  })
  pet: number;

  @property({
    type: 'number',
    required: true,
  })
  home: number;

  @property({
    type: 'number',
    required: true,
  })
  hobby: number;

  @property({
    type: 'number',
    required: true,
  })
  transport: number;

  @property({
    type: 'number',
    required: true,
  })
  study: number;

  @property({
    type: 'number',
    required: true,
  })
  others: number;

  @hasMany(() => Income)
  incomes: Income[];

  @hasMany(() => Debit)
  debits: Debit[];

  constructor(data?: Partial<Budget>) {
    super(data);
  }
}

export interface BudgetRelations {
  // describe navigational properties here
}

export type BudgetWithRelations = Budget & BudgetRelations;
