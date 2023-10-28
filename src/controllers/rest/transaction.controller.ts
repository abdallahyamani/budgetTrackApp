import { Controller, Inject, Use, UseBefore } from "@tsed/common";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Post, Put, Returns, Security } from "@tsed/schema";
import { TransactionService } from "../../app-services/transaction.service";
import { TransactionRequest } from "../../dto/request/transaction.request";
import { TransactionResponse } from "../../dto/response/transaction.response";
import { TransactionAuthMiddleware } from '../../middlewares/transactionAuth.middleware';
import { AuthMiddleware } from "../../middlewares/auth.middleware";

@Controller('/transaction')
export class TransactionController {

    @Inject(TransactionService)
    protected service: TransactionService
    
    @UseBefore(AuthMiddleware)
    @UseBefore(TransactionAuthMiddleware)

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
            transaction.user_id = newtransaction.user_id

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