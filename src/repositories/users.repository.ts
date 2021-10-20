import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Users, UsersRelations, Budget} from '../models';
import {BudgetRepository} from './budget.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly budgets: HasManyRepositoryFactory<Budget, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BudgetRepository') protected budgetRepositoryGetter: Getter<BudgetRepository>,
  ) {
    super(Users, dataSource);
    this.budgets = this.createHasManyRepositoryFactoryFor('budgets', budgetRepositoryGetter,);
    this.registerInclusionResolver('budgets', this.budgets.inclusionResolver);
  }
}
