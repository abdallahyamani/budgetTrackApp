import { Inject, Injectable } from "@tsed/common";
import { BUDGET_REPOSITORY } from "../repository/budget.repository";
import { BudgetRequest } from '../dto/request/budget.request';
import { BudgetResponse } from "../dto/response/budget.response";
import { Exception, NotFound } from "@tsed/exceptions";

@Injectable()
export class BudgetService {

    @Inject(BUDGET_REPOSITORY)
    protected budgetrepo: BUDGET_REPOSITORY

    async getAll(): Promise<BudgetResponse[]> {
        return await this.budgetrepo.find()
    }

    async getbyId(budget_id: string): Promise<BudgetResponse | null> {
        return await this.budgetrepo.findOne({ where: { budget_id: budget_id } })
    }


    async createBudget(budget: BudgetRequest): Promise<BudgetResponse> {
        return await this.budgetrepo.save(budget)
    }


    async updateBudget(budget_id: string, budget: BudgetRequest): Promise<any> {
        try {
            const exist = await this.budgetrepo.findOne({ where: { budget_id } })
            if (!exist) throw new NotFound("Budget not found")

            const updatedBudget = await this.budgetrepo.update(budget_id, budget)
            if (updatedBudget.affected === 0) {
                throw new Error("Failed to update budget");
            }
            return "Updated Budget " + budget_id;
        } catch (error) {
            if (error instanceof NotFound) {
                throw error;
            } else {
                throw new Exception(500, error.message);
            }
        }
    }

    async deleteBudget(budget_id: string): Promise<any> {
        try {
            const exists = await this.budgetrepo.findOne({ where: { budget_id } })
            if (!exists) throw new NotFound("Budget not found")

            const deletedBudget = await this.budgetrepo.delete(budget_id);
            if (deletedBudget.affected === 0) {
                throw new Error("Failed to delete budget. Budget doesn't exist");
            }
            return 'Deleted Budget ' + budget_id

        } catch (error) {
            if (error instanceof NotFound) throw error;
            else throw new Exception(500, error.message);
        }
    }
}