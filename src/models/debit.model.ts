import {Entity, model, property} from '@loopback/repository';

@model()
export class Debit extends Entity {
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
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
  })
  budgetId: number;

  constructor(data?: Partial<Debit>) {
    super(data);
  }
}

export interface DebitRelations {
  // describe navigational properties here
}

export type DebitWithRelations = Debit & DebitRelations;
