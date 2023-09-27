import { Inject, Injectable } from "@tsed/common";
import { TransactionRequest } from "../dto/request/transaction.request";
import { TransactionResponse } from "../dto/response/transaction.response";
import { TRANSACTION_REPOSITORY } from "src/repository/transaction.repository";
import { Exception, NotFound } from "@tsed/exceptions";

@Injectable()
export class TransactionService {

    @Inject(TRANSACTION_REPOSITORY)
    protected transrepo: TRANSACTION_REPOSITORY

    async getAll(): Promise<TransactionResponse[]> {
        return await this.transrepo.find()
    }

    async getById(transaction_id: string): Promise<TransactionResponse | null> {
        return await this.transrepo.findOne({ where: { transaction_id: transaction_id } })
    }

    async createTransaction(transaction: TransactionRequest): Promise<TransactionResponse> {
        return await this.transrepo.save(transaction)
    }

    async updateTransaction(transaction_id: string, transaction: TransactionRequest): Promise<any> {
        try {
            const existTransaction = await this.transrepo.findOne({ where: { transaction_id } })
            if (!existTransaction) throw new NotFound("Transaction not found")

            const updatedTransaction = await this.transrepo.update(transaction_id, transaction)
            if (updatedTransaction.affected === 0) {
                throw new Error("Failed to update Transaction");
            }
            return 'Updated Transaction ' + transaction_id
        } catch (error) {
            if (error instanceof NotFound) {
                throw error;
            } else {
                throw new Exception(500, error.message);
            }
        }
    }

    async deleteTransaction(transaction_id: string): Promise<any> {
        try {
            const existTransaction = await this.transrepo.findOne({ where: { transaction_id } })
            if (!existTransaction) throw new NotFound("Transaction not found")

            const deletedTransaction = await this.transrepo.delete(transaction_id);
            if (deletedTransaction.affected === 0) {
                throw new Error("Failed to delete transaction. Transaction doesn't exist");
            }
            return 'Deleted Transaction ' + transaction_id

        } catch (error) {
            if (error instanceof NotFound) throw error;
            else throw new Exception(500, error.message);
        }
    }
}