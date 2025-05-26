import { Request, Response } from 'express';
import { Usuario } from '../models/usuarios';
import bcrypt from 'bcrypt';


import jwt from 'jsonwebtoken';

const SECRET_KEY = 'uavdocx'; // igual q middleware



export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
  console.log('Datos recibidos en registro:', req.body);


  const { nombre_usuario, contrasenia } = req.body;

  if (!nombre_usuario || !contrasenia) {
    res.status(400).json({ mensaje: 'Faltan datos' });
    return;
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { nombre_usuario } });
    if (usuarioExistente) {
      res.status(409).json({ mensaje: 'El usuario ya existe' });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasenia, saltRounds);



    const nuevoUsuario = await Usuario.create({ nombre_usuario, contrasenia: hashedPassword });

    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  } catch (error: any) {
    console.error('Error en registrarUsuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message || error });


  }
};

export const comprobarUsuario = async (req: Request, res: Response): Promise<void> => {


  const { usuario_ingreso, pass_ingreso } = req.body;

  if (!usuario_ingreso || !pass_ingreso) {
    res.status(400).json({ mensaje: 'Faltan ingresar datos' });
    return;
  }

  try {
    const usuario = await Usuario.findOne({ where: { nombre_usuario: usuario_ingreso } });

    if (!usuario) {
      res.status(404).json({ mensaje: 'El usuario no fue encontrado' });
      return;
    }

    const hashBD = usuario.get('contrasenia') as string;

    const passBien = await bcrypt.compare(pass_ingreso, hashBD);

    if (passBien) {
      const token = jwt.sign(
        { nombre_usuario: usuario_ingreso },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.status(200).json({ mensaje: 'Login correcto', token });
    } else {
      res.status(401).json({ mensaje: 'La contraseña es incorrecta' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al ingresar al usuario' });


  }
};
