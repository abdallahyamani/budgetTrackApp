import { Inject } from '@tsed/common';
import { TRANSACTION_REPOSITORY, TransactionRepository } from "src/repository/transaction.repository";


export class UserBalance {

    @Inject(TRANSACTION_REPOSITORY)
    protected repo: TRANSACTION_REPOSITORY

    // need to use app-services

    // get all transaction records having same budget_id & calculate them
    async getSumForBudget(budgetId: string): Promise<number> {
        try {
            const transactions = await this.repo.find({ where: { budget_id: budgetId } })

            if (!transactions || transactions.length === 0) {
                return 0; // No transactions found for the budget
            }

            let totalAmount = 0;

            for (const transaction of transactions) {
                totalAmount += transaction.amount
            } 
            // console.log(totalAmount)
            return totalAmount;
        } catch (error) {
            throw new Error("Error calculating sum");
        }
    }
}