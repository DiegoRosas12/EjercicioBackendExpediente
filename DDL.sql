CREATE USER expediente_user WITH PASSWORD 'expediente12345';
CREATE DATABASE IF NOT EXISTS expediente_db;
GRANT CONNECT ON DATABASE expediente_db TO expediente_user;
GRANT INSERT, UPDATE, DELETE, SELECT ON ALL TABLES IN SCHEMA public TO expediente_user;

/*
La ventaja de utilizar un ORM como Sequelize es poder evitar escribir las consultas en sql manualmente.
Sin embargo aquí se deja el código SQL de su implementación.
NO es necesario el uso del siguiente script si ya se ejecutó el programa
*/
-- Se utiliza un plugin para hacer el llenado con uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS Expediente (
    uuid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1(),
    nombre VARCHAR(255) NOT NULL,
    ultimaConsulta DATETIME DEFAULT CURRENT_TIMESTAMP,
    sangre varchar(4) NOT NULL
);

CREATE TABLE IF NOT EXISTS alergia (
    id PRIMARY KEY INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    medicamento VARCHAR(255) NOT NULL
);
-- Relación muchos a muchos a través de una tabla intermedia
CREATE TABLE IF NOT EXISTS expedienteAlergia (
    uuid UUID NOT NULL,
    alergiaId INT NOT NULL,
    FOREIGN KEY (uuid) REFERENCES Expediente(uuid),
    FOREIGN KEY (alergiaId) REFERENCES alergia(id),
    PRIMARY KEY(uuid, alergiaId)
);