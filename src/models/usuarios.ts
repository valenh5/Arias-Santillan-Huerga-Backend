
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
//verificar columnas si son iguales a la del sql

export const Usuario = sequelize.define('Usuario', {
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,

    field: 'contraseña_hash',
  },
}, {
  timestamps: false,  
});

