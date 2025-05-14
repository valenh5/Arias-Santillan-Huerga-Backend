import { DataTypes, STRING } from 'sequelize';
import { sequelize } from '../config/db';

export const Usuario = sequelize.define('Usuario', {
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});