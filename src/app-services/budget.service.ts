import { Inject, Injectable } from "@tsed/common";
import { BUDGET_REPOSITORY } from "../repository/budget.repository";
import { BudgetRequest } from '../dto/request/budget.request';
import { BudgetResponse } from "../dto/response/budget.response";

@Injectable()
export class BudgetService {

    @Inject(BUDGET_REPOSITORY)
    protected budgetrepo : BUDGET_REPOSITORY

    async getAll() : Promise< BudgetResponse[] > {
        return await this.budgetrepo.find()
    }

    async getbyId(id: string) : Promise<BudgetResponse | null> {
        return await this.budgetrepo.findOne({where: { id : id} })
    }


    async createBudget(budget: BudgetRequest) : Promise<BudgetResponse> {
        return await this.budgetrepo.save(budget)
    }


    async updateBudget(id: string, budget: BudgetRequest) : Promise<any> {
        return await this.budgetrepo.update(id,budget)
    }


    async deleteBudget(id: string) : Promise<any> {
        return await this.budgetrepo.delete(id)
    }
}