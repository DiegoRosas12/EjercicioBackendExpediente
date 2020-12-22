import models from '../../database/models';

// Esta función utiliza un patrón de diseño creacional
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
    // Todavia no se implementa un sistema de gestión de alergias por lo cual
    // siempre creará nuevos registros
    await body.alergias.forEach(async alergia => {
      if (alergia.nombre && alergia.medicamento) {
        let nuevaAlergia = await models.alergia.create({
          nombre: alergia.nombre,
          medicamento: alergia.medicamento
        });
        await models.expedienteAlergia.create({
          uuid: expediente.uuid,
          alergiaId: nuevaAlergia.id
        });
      } else {
        return res.status(400).send('Datos de la alergia faltantes');
      }
    });

    res.status(200).send(expediente);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

// Patrón de diseño de comportamiento iterador
export async function obtenerCadaExpediente(req, res) {
  try {
    const expedientes = await models.Expediente.findAll({
      attributes: { exclude: ['updatedAt'] },
      include: ['alergias']
    });
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

    let expediente = await models.Expediente.findAll({
      include: ['alergias'],
      where: {
        uuid: params.uuid
      },
      plain: true
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
    } else {
      const response = {
        codigo: 400,
        mensaje: 'El id de usuario no existe'
      };
      return res.status(404).send(response);
    }

    res.status(200).send(expediente);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}
