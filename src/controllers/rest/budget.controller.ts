import { BodyParams, Controller, Err, Inject, PathParams, Use, UseBefore } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { Delete, Get, Post, Put, Returns, Security } from '@tsed/schema';
import { BudgetService } from "src/app-services/budget.service";
import { BudgetRequest } from "src/dto/request/budget.request";
import { BudgetResponse } from "src/dto/response/budget.response";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

@Controller('/budget')
// Applying auth middleware to controller
@UseBefore(AuthMiddleware)
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
    async deleteBudget(@PathParams('budgetId') budgetId: string): Promise<any> {
        try {
             await this.service.deleteBudget(budgetId)
             return "Deleted successfully"
        } catch (err) {
            throw new Error("Resource not found")
            
        }
    }

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
            budget.startDate = newBudget.startDate
            budget.endDate = newBudget.endDate

            const finalBudget = await this.service.updateBudget(budgetId, budget)
            return finalBudget

        } catch (error) {
            throw new Error(error)
        }
    }
}