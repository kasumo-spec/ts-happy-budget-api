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
  Income,
} from '../models';
import {BudgetRepository} from '../repositories';

export class BudgetIncomeController {
  constructor(
    @repository(BudgetRepository) protected budgetRepository: BudgetRepository,
  ) { }

  @get('/budgets/{id}/incomes', {
    responses: {
      '200': {
        description: 'Array of Budget has many Income',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Income)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Income>,
  ): Promise<Income[]> {
    return this.budgetRepository.incomes(id).find(filter);
  }

  @post('/budgets/{id}/incomes', {
    responses: {
      '200': {
        description: 'Budget model instance',
        content: {'application/json': {schema: getModelSchemaRef(Income)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Budget.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Income, {
            title: 'NewIncomeInBudget',
            exclude: ['id'],
            optional: ['budgetId']
          }),
        },
      },
    }) income: Omit<Income, 'id'>,
  ): Promise<Income> {
    return this.budgetRepository.incomes(id).create(income);
  }

  @patch('/budgets/{id}/incomes', {
    responses: {
      '200': {
        description: 'Budget.Income PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Income, {partial: true}),
        },
      },
    })
    income: Partial<Income>,
    @param.query.object('where', getWhereSchemaFor(Income)) where?: Where<Income>,
  ): Promise<Count> {
    return this.budgetRepository.incomes(id).patch(income, where);
  }

  @del('/budgets/{id}/incomes', {
    responses: {
      '200': {
        description: 'Budget.Income DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Income)) where?: Where<Income>,
  ): Promise<Count> {
    return this.budgetRepository.incomes(id).delete(where);
  }
}
