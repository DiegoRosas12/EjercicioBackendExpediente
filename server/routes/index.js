import { Router } from 'express';
const router = Router();

import {
  agregarExpediente,
  obtenerCadaExpediente,
  obtenerUnExpediente
} from '../controllers/expediente';

router.post('/', agregarExpediente);
router.get('/', obtenerCadaExpediente);
router.get('/:uuid/', obtenerUnExpediente);

export default router;
