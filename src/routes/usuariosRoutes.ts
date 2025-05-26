import express from 'express';
import { 
    comprobarUsuario,
    registrarUsuario 
} 
from '../controllers/usuarioController';


import { authenticateToken } from '../middleware/usuarios';



const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/ingresar', comprobarUsuario);


router.get('/perfil', authenticateToken, (req, res) => {
  const user = (req as any).user;
  res.json({ mensaje: 'Acceso autorizado', usuario: user });
});


export default router;

