import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Debit} from '../models';
import {DebitRepository} from '../repositories';

export class DebitController {
  constructor(
    @repository(DebitRepository)
    public debitRepository : DebitRepository,
  ) {}

  @post('/debits')
  @response(200, {
    description: 'Debit model instance',
    content: {'application/json': {schema: getModelSchemaRef(Debit)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Debit, {
            title: 'NewDebit',
            exclude: ['id'],
          }),
        },
      },
    })
    debit: Omit<Debit, 'id'>,
  ): Promise<Debit> {
    return this.debitRepository.create(debit);
  }

  @get('/debits/count')
  @response(200, {
    description: 'Debit model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Debit) where?: Where<Debit>,
  ): Promise<Count> {
    return this.debitRepository.count(where);
  }

  @get('/debits')
  @response(200, {
    description: 'Array of Debit model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Debit, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Debit) filter?: Filter<Debit>,
  ): Promise<Debit[]> {
    return this.debitRepository.find(filter);
  }

  @patch('/debits')
  @response(200, {
    description: 'Debit PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Debit, {partial: true}),
        },
      },
    })
    debit: Debit,
    @param.where(Debit) where?: Where<Debit>,
  ): Promise<Count> {
    return this.debitRepository.updateAll(debit, where);
  }

  @get('/debits/{id}')
  @response(200, {
    description: 'Debit model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Debit, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Debit, {exclude: 'where'}) filter?: FilterExcludingWhere<Debit>
  ): Promise<Debit> {
    return this.debitRepository.findById(id, filter);
  }

  @patch('/debits/{id}')
  @response(204, {
    description: 'Debit PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Debit, {partial: true}),
        },
      },
    })
    debit: Debit,
  ): Promise<void> {
    await this.debitRepository.updateById(id, debit);
  }

  @put('/debits/{id}')
  @response(204, {
    description: 'Debit PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() debit: Debit,
  ): Promise<void> {
    await this.debitRepository.replaceById(id, debit);
  }

  @del('/debits/{id}')
  @response(204, {
    description: 'Debit DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.debitRepository.deleteById(id);
  }
}
