import Sequelize from 'sequelize'
import { DataTypes } from 'sequelize';

export async function setDbModel() {
  const sequelize = new Sequelize('sqlite::memory', {
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: console.log,

  });

  // await sequelize.authenticate();
  // console.log("postgres is running");

  const rocketnews = sequelize.define("rocketnews", {
    emails: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  });
  console.log(rocketnews)
  await rocketnews.sync();

  return rocketnews
}