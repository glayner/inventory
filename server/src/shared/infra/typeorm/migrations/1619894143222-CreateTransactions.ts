import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransactions1619894143222
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'purchased_qnt',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'purchased_unt',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'purchased_amt',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'sold_qnt',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'sold_unt',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'sold_amt',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'balance_qnt',
            type: 'numeric',
          },
          {
            name: 'balance_unt',
            type: 'numeric',
          },
          {
            name: 'balance_amt',
            type: 'numeric',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'TransactionProduct',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'TransactionProduct');
    await queryRunner.dropTable('transactions');
  }
}
