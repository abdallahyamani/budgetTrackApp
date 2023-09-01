import { BodyParams, Controller, Err, Inject, PathParams } from "@tsed/common";
import { Delete, Get, Post, Put, Returns } from '@tsed/schema';
import { BudgetService } from "src/app-services/budget.service";
import { BudgetRequest } from "src/dto/request/budget.request";
import { BudgetResponse } from "src/dto/response/budget.response";

@Controller('/budget')
export class BudgetController {

    @Inject(BudgetService)
    protected service: BudgetService

    @Get('/:budgetId')
    @Returns(200, Array).Of(BudgetResponse)
    async getbyId(@PathParams('budgetId') budgetId: string): Promise<BudgetResponse | null> {
        try {
            return await this.service.getbyId(budgetId)
        } catch (err) {
            throw new Error(err)
        }
    }

    @Post('/')
    async createBudget(@BodyParams() budget: BudgetRequest): Promise<BudgetResponse> {
        try {
            return await this.service.createBudget(budget)
        } catch (err) {
            throw new Error(err)
        }
    }

    @Delete('/:budgetId')
    async deleteBudget(@PathParams('budgetId') budgetId: string): Promise<BudgetResponse> {
        try {
            return await this.service.deleteBudget(budgetId)
        } catch (err) {
            throw new Error(err)
        }
    }

    @Put('/:budgetId')
    async update(
        @PathParams('budgetId') budgetId: string,
        @BodyParams() newBudget: BudgetRequest): Promise<BudgetResponse> {
        try {
            let budget = await this.service.getbyId(budgetId)
            if (!budget) {
                throw new Error("Product not found")
            }

            budget.income = newBudget.income
            budget.category = newBudget.category
            budget.startDate = newBudget.startDate
            budget.endDate = newBudget.endDate

            const finalBudget = await this.service.updateBudget(budgetId, budget)
            return finalBudget

        } catch (error) {
            throw new Error(error)
        }

    }


}