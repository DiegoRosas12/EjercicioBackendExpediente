import models from '../../database/models';
import Sequelize from 'sequelize';

export async function agregarExpediente(req, res) {
  try {
    const { body } = req;

    if (!nombre) return res.status(401).send('Nombre requerido');

    let nuevoExpediente = {
      nombre: body.nombre,
      ultimaConsulta: Date.now(),
      sangre: body.sangre
    };
    const expediente = await models.expediente.create(body);
    res.status(200).send(expediente);
  } catch (err) {
    res.status(500).send(err);
  }
}
