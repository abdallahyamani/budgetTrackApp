import { Controller, Inject, Use, UseBefore } from "@tsed/common";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Post, Put, Returns, Security } from "@tsed/schema";
import { TransactionService } from "src/app-services/transaction.service";
import { TransactionRequest } from "src/dto/request/transaction.request";
import { TransactionResponse } from "src/dto/response/transaction.response";
import { AuthMiddleware } from '../../middlewares/auth.middleware';

@Controller('/transaction')
// Applying auth middleware to controller
// @UseBefore(AuthMiddleware)
export class TransactionController {

    @Inject(TransactionService)
    protected service: TransactionService

    @Get('/:transactionId')
    @Returns(200, Array).Of(TransactionRequest)
    async getById(@PathParams('transaction_id') transaction_id: string): Promise<TransactionResponse | null> {
        try {
            return await this.service.getById(transaction_id)
        } catch (error) {
            throw new Error(error)
        }
    }

    @Post('/')
    async creatTransaction(@BodyParams() transaction: TransactionRequest): Promise<TransactionResponse> {
        try {
            return await this.service.createTransaction(transaction)
        } catch (error) {
            throw new Error(error)
        }
    }
    
    @Put('/:transactionId')
    async updatetransaction(
        @PathParams('transaction_id') transaction_id: string,
        @BodyParams() newtransaction: TransactionRequest): Promise<TransactionResponse> {
        try {
            let transaction = await this.service.getById(transaction_id)
            if (!transaction) {
                throw new Error('transaction not found')
            }
            
            transaction.budget_id = newtransaction.budget_id
            transaction.amount = newtransaction.amount
            transaction.description = newtransaction.description

            const finalTransaction = await this.service.updateTransaction(transaction_id, transaction)
            return finalTransaction
            
        } catch (error) {
            throw new Error(error)
        }
    }
    
    @Delete('/:transactionId')
    async delete(@PathParams('transaction_id') transaction_id: string): Promise<any> {
        return await this.service.deleteTransaction(transaction_id)
    }
}