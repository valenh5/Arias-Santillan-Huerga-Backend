import { Request, Response } from 'express';
import { Usuario } from '../models/usuarios';
import bcrypt from 'bcrypt';
import { hash } from 'crypto';

export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
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

    const nuevoUsuario = await Usuario.create({ nombre_usuario, contrasenia: hashedPassword});

    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

export const comprobarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { nombre_usuario, contrasenia } = req.body; 
  
  if (!req.body.usuario_ingreso|| !req.body.pass_ingreso) {
    res.status(400).json({ mensaje: 'Faltan ingresar datos' });
    return;
  }
  try {
    const nombre_usuario = req.body.usuario_ingreso;
    const usuario = await Usuario.findOne({ where: { nombre_usuario } });

    if(!usuario) {
      res.status(409).json({ mensaje: 'El usuario no fue encontrado' });
      return;
    }

    const pass = req.body.pass_ingreso;

    const hashBD = '' + usuario.get('contrasenia');

    const passBien = await bcrypt.compare(pass, hashBD);
    
    if(passBien) {
      res.status(409).json({ mensaje: 'La contraseña es correcta' });
    } else {
      res.status(409).json({ mensaje: 'La contraseña es incorrecta' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};
