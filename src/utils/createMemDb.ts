import { ModelCtor, Sequelize } from 'sequelize-typescript';

export async function createMemDB(models: ModelCtor[]): Promise<Sequelize> {
  const memDb = new Sequelize({
    dialect: 'sqlite',
    host: 'localhost',
    port:5432,
    username:'postgres',
    password:'123',
    database:'testing',
  });
  memDb.addModels(models);

  // Creates the database structure
  await memDb.sync();

  return memDb;
}