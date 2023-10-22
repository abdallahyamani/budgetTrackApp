import { BodyParams, Controller, Err, Inject, PathParams, Req, UseBefore } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { Delete, Get, Post, Put, Returns } from '@tsed/schema';
import { BudgetService } from "src/app-services/budget.service";
import { BudgetRequest } from "src/dto/request/budget.request";
import { BudgetResponse } from "src/dto/response/budget.response";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { BudgetAuthMiddleware } from "src/middlewares/budgetAuth.middleware";

@Controller('/budget')
export class BudgetController {

    @Inject(BudgetService)
    protected service: BudgetService

// Applying auth middleware
    @UseBefore(AuthMiddleware)
    @UseBefore(BudgetAuthMiddleware)

    @Get('/:budgetId')
    @Returns(200, Array).Of(BudgetResponse)
    async getbyId(@PathParams('budgetId') budgetId: string): Promise<BudgetResponse | null> {
        try {
            // checks corresponding budget matches user accessing it
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

// Applying auth middleware
    @UseBefore(AuthMiddleware)
    @UseBefore(BudgetAuthMiddleware)

    @Put('/:budgetId')
    async update(
        @PathParams('budgetId') budgetId: string,
        @BodyParams() newBudget: BudgetRequest): Promise<BudgetResponse> {
        try {
            let budget = await this.service.getbyId(budgetId)
            if (!budget) {
                throw new NotFound("Budget not found");
            }

            budget.income = newBudget.income
            budget.category = newBudget.category
            budget.user_id = newBudget.user_id
            budget.startDate = newBudget.startDate
            budget.endDate = newBudget.endDate

            const finalBudget = await this.service.updateBudget(budgetId, budget)
            return finalBudget

        } catch (error) {
            throw new Error(error)
        }
    }

// Applying auth middleware
    @UseBefore(AuthMiddleware)
    @UseBefore(BudgetAuthMiddleware)

    @Delete('/:budgetId')
    async delete(@PathParams('budgetId') budgetId: string): Promise<any> {
        return await this.service.deleteBudget(budgetId)
    }
}