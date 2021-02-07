import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateMembers1612657182832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'members',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'birth',
            type: 'timestamp with time zone',
          },
          {
            name: 'gender',
            type: 'varchar',
          },
          {
            name: 'blood',
            type: 'varchar',
          },
          {
            name: 'weight',
            type: 'integer',
          },
          {
            name: 'height',
            type: 'integer',
          },
          {
            name: 'instructor_id',
            type: 'uuid',
            isNullable: true,
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
      }),
    );

    await queryRunner.createForeignKey(
      'members',
      new TableForeignKey({
        name: 'members_instructor_id_fkey',
        columnNames: ['instructor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'instructors',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('members', 'members_instructor_id_fkey');
    await queryRunner.dropTable('members');
  }
}
