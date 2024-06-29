// src/config/database.ts
import { Sequelize,DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const db: any = {};
let sequelize: any;
const basename = path.basename(__filename);
sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PWD as string,
  {
    host: process.env.DB_SERVER,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  }
);

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
