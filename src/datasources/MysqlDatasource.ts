import {registerProvider} from "@tsed/di";
import {DataSource} from "typeorm";
import {Logger} from "@tsed/logger";
import { BudgetModel } from "src/models/budgetModel";
import { TransactionModel } from "src/models/transactionModel";

export const MYSQL_DATA_SOURCE = Symbol.for("MysqlDataSource");
export const MysqlDataSource = new DataSource({
  type: "mysql",
  name: "mysqlConnection", // Add this line
  entities: [BudgetModel, TransactionModel],
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER || "sudo",
  password: process.env.MYSQL_PASSWORD || "P@ssw0rd",
  database: process.env.MYSQL_DATABASE || "budgetAppDB",
  synchronize: true,

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
