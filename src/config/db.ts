import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('telefono_basedatos', 'root', 'valen3008', {
  host: 'localhost',
  dialect: 'mysql',
});