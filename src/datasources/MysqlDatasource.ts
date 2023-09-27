import { registerProvider } from "@tsed/di";
import { DataSource } from "typeorm";
import { Logger } from "@tsed/logger";
import { BudgetModel } from "../models/budgetModel";
import { TransactionModel } from "../models/transactionModel";
import { UserModel } from "src/models/userModel";

export const MYSQL_DATA_SOURCE = Symbol.for("MysqlDataSource");
export const MysqlDataSource = new DataSource({
  type: "mysql",
  name: "mysqlConnection", // Add this line
  entities: [BudgetModel, TransactionModel, UserModel],
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,

});

registerProvider<DataSource>({
  provide: MYSQL_DATA_SOURCE,
  type: "typeorm:datasource",
  deps: [Logger],
  async useAsyncFactory(logger: Logger) {
    await MysqlDataSource.initialize();

    logger.info("Connected with typeorm to database: Mysql");

    return MysqlDataSource;
  },
  hooks: {
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.close();
    }
  }
});
