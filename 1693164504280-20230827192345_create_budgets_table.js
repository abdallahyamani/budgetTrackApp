const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class 20230827192345CreateBudgetsTable1693164504280 {
    name = '20230827192345CreateBudgetsTable1693164504280'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE \`budget_model\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`category\` varchar(255) NOT NULL,
                \`income\` int NOT NULL,
                \`startDate\` datetime NOT NULL,
                \`endDate\` datetime NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`transaction_model\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`budget_id\` int NOT NULL,
                \`amount\` int NOT NULL,
                \`description\` varchar(255) NOT NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`transaction_model\`
            ADD CONSTRAINT \`FK_8ee4024a3b83295bcd6fc839b86\` FOREIGN KEY (\`budget_id\`) REFERENCES \`budget_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE \`transaction_model\` DROP FOREIGN KEY \`FK_8ee4024a3b83295bcd6fc839b86\`
        `);
        await queryRunner.query(`
            DROP TABLE \`transaction_model\`
        `);
        await queryRunner.query(`
            DROP TABLE \`budget_model\`
        `);
    }
}
