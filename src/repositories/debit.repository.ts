import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Debit, DebitRelations} from '../models';

export class DebitRepository extends DefaultCrudRepository<
  Debit,
  typeof Debit.prototype.id,
  DebitRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Debit, dataSource);
  }
}
