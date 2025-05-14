import express from 'express';
import { 
    comprobarUsuario,
    registrarUsuario 
} 
from '../controllers/usuarioController';

const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/ingresar', comprobarUsuario);

export default router;

