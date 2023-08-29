import { TransactionModel } from '../models/transactionModel';
import { MysqlDataSource } from '../datasources/MysqlDatasource';
import { registerProvider } from "@tsed/common";

    export const TransactionRepository = MysqlDataSource.getRepository(TransactionModel)
    export const TRANSACTION_REPOSITORY = Symbol.for('TransactionRepository')

    export type TRANSACTION_REPOSITORY = typeof TransactionRepository
    registerProvider ({
        provide: TRANSACTION_REPOSITORY,
        useValue: TransactionRepository
    })
