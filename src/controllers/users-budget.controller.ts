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
  Users,
  Budget,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersBudgetController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/budgets', {
    responses: {
      '200': {
        description: 'Array of Users has many Budget',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Budget)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Budget>,
  ): Promise<Budget[]> {
    return this.usersRepository.budgets(id).find(filter);
  }

  @post('/users/{id}/budgets', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Budget)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Budget, {
            title: 'NewBudgetInUsers',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) budget: Omit<Budget, 'id'>,
  ): Promise<Budget> {
    return this.usersRepository.budgets(id).create(budget);
  }

  @patch('/users/{id}/budgets', {
    responses: {
      '200': {
        description: 'Users.Budget PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Budget, {partial: true}),
        },
      },
    })
    budget: Partial<Budget>,
    @param.query.object('where', getWhereSchemaFor(Budget)) where?: Where<Budget>,
  ): Promise<Count> {
    return this.usersRepository.budgets(id).patch(budget, where);
  }

  @del('/users/{id}/budgets', {
    responses: {
      '200': {
        description: 'Users.Budget DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Budget)) where?: Where<Budget>,
  ): Promise<Count> {
    return this.usersRepository.budgets(id).delete(where);
  }
}
