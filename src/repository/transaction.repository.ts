import { TransactionModel } from 'src/models/transactionModel';
import { MysqlDataSource } from '../datasources/MysqlDataSource';
import { registerProvider } from "@tsed/common";

    const TransactionRepository = MysqlDataSource.getRepository(TransactionModel)
    const TRANSACTION_REPOSITORY = Symbol.for('TransactionRepository')

    export type TRANSACTION_REPOSITORY = typeof TransactionRepository
    registerProvider ({
        provide: TRANSACTION_REPOSITORY,
        useValue: TransactionRepository
    })
