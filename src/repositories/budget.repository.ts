import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Budget, BudgetRelations, Income, Debit} from '../models';
import {IncomeRepository} from './income.repository';
import {DebitRepository} from './debit.repository';

export class BudgetRepository extends DefaultCrudRepository<
  Budget,
  typeof Budget.prototype.id,
  BudgetRelations
> {

  public readonly incomes: HasManyRepositoryFactory<Income, typeof Budget.prototype.id>;

  public readonly debits: HasManyRepositoryFactory<Debit, typeof Budget.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('IncomeRepository') protected incomeRepositoryGetter: Getter<IncomeRepository>, @repository.getter('DebitRepository') protected debitRepositoryGetter: Getter<DebitRepository>,
  ) {
    super(Budget, dataSource);
    this.debits = this.createHasManyRepositoryFactoryFor('debits', debitRepositoryGetter,);
    this.registerInclusionResolver('debits', this.debits.inclusionResolver);
    this.incomes = this.createHasManyRepositoryFactoryFor('incomes', incomeRepositoryGetter,);
    this.registerInclusionResolver('incomes', this.incomes.inclusionResolver);
  }
}
