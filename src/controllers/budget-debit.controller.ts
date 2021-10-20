import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Budget,
  Debit,
} from '../models';
import {BudgetRepository} from '../repositories';

export class BudgetDebitController {
  constructor(
    @repository(BudgetRepository) protected budgetRepository: BudgetRepository,
  ) { }

  @get('/budgets/{id}/debits', {
    responses: {
      '200': {
        description: 'Array of Budget has many Debit',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Debit)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Debit>,
  ): Promise<Debit[]> {
    return this.budgetRepository.debits(id).find(filter);
  }

  @post('/budgets/{id}/debits', {
    responses: {
      '200': {
        description: 'Budget model instance',
        content: {'application/json': {schema: getModelSchemaRef(Debit)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Budget.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Debit, {
            title: 'NewDebitInBudget',
            exclude: ['id'],
            optional: ['budgetId']
          }),
        },
      },
    }) debit: Omit<Debit, 'id'>,
  ): Promise<Debit> {
    return this.budgetRepository.debits(id).create(debit);
  }

  @patch('/budgets/{id}/debits', {
    responses: {
      '200': {
        description: 'Budget.Debit PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Debit, {partial: true}),
        },
      },
    })
    debit: Partial<Debit>,
    @param.query.object('where', getWhereSchemaFor(Debit)) where?: Where<Debit>,
  ): Promise<Count> {
    return this.budgetRepository.debits(id).patch(debit, where);
  }

  @del('/budgets/{id}/debits', {
    responses: {
      '200': {
        description: 'Budget.Debit DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Debit)) where?: Where<Debit>,
  ): Promise<Count> {
    return this.budgetRepository.debits(id).delete(where);
  }
}
