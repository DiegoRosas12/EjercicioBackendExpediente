import models from '../../database/models';
import Sequelize, { where } from 'sequelize';

export async function agregarExpediente(req, res) {
  try {
    const { body } = req;

    if (!body.nombre) return res.status(400).send('Nombre requerido');
    if (!body.sangre) return res.status(400).send('Tipo de sangre requerido');
    if (
      ![
        'A+',
        'A-',
        'AB+',
        'AB-',
        'B+',
        'B-',
        'O+',
        'O-',
        'AB+',
        'AB-'
      ].includes(body.sangre.toUpperCase())
    )
      return res
        .status(400)
        .send(
          'Los tipos de sangre válidos son: A+, A-, AB+, AB-, B+, B-, O+, O-, AB+, AB-'
        );
    let nuevoExpediente = {
      nombre: body.nombre,
      ultimaConsulta: Date.now(),
      sangre: body.sangre.toUpperCase()
    };
    const expediente = await models.Expediente.create(nuevoExpediente);
    res.status(200).send(expediente);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

export async function obtenerCadaExpediente(req, res) {
  try {
    const expedientes = await models.Expediente.findAll();
    res.status(200).send(expedientes);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

export async function obtenerUnExpediente(req, res) {
  try {
    const { params } = req;

    if (!params.uuid) return res.status(400).send('uuid requerido');

    const expediente = await models.Expediente.findOne({
      where: {
        uuid: params.uuid
      }
    });

    if (expediente) {
      await models.Expediente.update(
        {
          uuid: params.uuid
        },
        {
          where: {
            uuid: params.uuid
          }
        }
      );
    }

    res.status(200).send(expediente);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}
