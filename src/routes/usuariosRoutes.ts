import express from 'express';
import { 
    registrarUsuario 
} 
from '../controllers/usuarioController';

const router = express.Router();

router.post('/registro', registrarUsuario);

export default router;

