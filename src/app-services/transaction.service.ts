import { Inject, Injectable } from "@tsed/common";
import { TransactionRequest } from "../dto/request/transaction.request";
import { TransactionResponse } from "../dto/response/transaction.response";
import { TRANSACTION_REPOSITORY } from "src/repository/transaction.repository";
import { Exception, NotFound } from "@tsed/exceptions";

@Injectable()
export class TransactionService {

    @Inject(TRANSACTION_REPOSITORY)
    protected transrepo : TRANSACTION_REPOSITORY

    async getAll() : Promise<TransactionResponse[]> {
        return await this.transrepo.find()
    }

    async getById(id: string) : Promise<TransactionResponse | null> {
        return await this.transrepo.findOne({where: {id : id} })
    }

    async createTransaction(transaction: TransactionRequest) : Promise<TransactionResponse> {
        return await this.transrepo.save(transaction)
    }

    async updateTransaction(id : string, transaction: TransactionRequest) : Promise<any> {
        return await this.transrepo.update(id,transaction)
    }

    async deleteTransaction(id : string) : Promise<any> {
        try {
            const deleted = await this.transrepo.findOne({ where: { id } })
            if (!deleted) throw new NotFound("Transaction not found");
      
            await this.transrepo.remove(deleted);
            return true;
          } catch (error) {
            if (error instanceof NotFound) throw error;
            else throw new Exception(500, error.message);
          }
    }
}