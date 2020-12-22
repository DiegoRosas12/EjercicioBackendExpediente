# EjercicioBackendExpediente

# Instrucciones de instalación
## Requisitos
- Postgres
- NodeJS

## 1. Instalar Postgres

Buscar las intrucciones según el sistema operativo o distribución.
Si está corriendo correctamente el siguiente comando debería de devolver la versión de postgres:

`psql --version`

## 2. Creación de usuario y base de datos

Ejecutar el comando para iniciar sesión con el usuario de postgres: `sudo su postgres -c psql`  
También existe la manera de entrar como el usuario de postgres con el comando `sudo -i -u postgres` y posteriormente `psql`.

Luego es necesario crear al usuario en la terminal escribiendo el comando:

```sql
CREATE USER expediente_user WITH PASSWORD 'expediente12345';
```

Se crea la base de datos con el comando:

```sql
CREATE DATABASE expediente_db;
```

Finalmente se otorgan permisos al usuario recién creado:

```sql
GRANT CONNECT ON DATABASE expediente_db TO expediente_user;
GRANT INSERT, UPDATE, DELETE, SELECT ON ALL TABLES IN SCHEMA public TO expediente_user;
```

## 3. Variables de entorno

Crear un archivo en la raíz llamado `.env` que contenga lo siguiente:

```
TZ=America/Mexico_City
LC_CTYPE=en_US.UTF-8
LC_ALL=en_US.UTF-8
DB_USER=expediente_user
PORT=5000
DB_HOST=localhost
DB_NAME=expediente_db
DB_PASSWORD=expediente12345
DB_PORT=5432
ACCESS_TOKEN_SECRET=myaccesstokensecret
REFRESH_TOKEN_SECRET=myrefreshtokensecret
NODE_ENV=development
```

# Instalación de modulos de Node
`npm install`
# Ejecución

Para correr el programa se escribe el siguiente comando:
`npm run dev`

# Endpoints

Se pueden probar los endpoints en programas como Postman o Imsomnia

## Obtener todos los expedientes

GET `localhost:5000/api`  
Regresa un arreglo. Por ejemplo:

```JSON
[
    {
        "uuid": "7a9ef35f-fde2-4e29-a699-b33035e5b44c",
        "nombre": "Juan Perez",
        "ultimaConsulta": "2020-12-22T06:01:12.135Z",
        "sangre": "O+",
        "createdAt": "2020-12-22T06:01:12.137Z",
        "updatedAt": "2020-12-22T06:01:12.137Z",
        "alergias": [
            {
                "id": 13,
                "nombre": "almendras",
                "medicamento": "ranitidina",
                "createdAt": "2020-12-22T06:01:12.191Z",
                "updatedAt": "2020-12-22T06:01:12.191Z",
                "expedienteAlergia": {
                    "uuid": "7a9ef35f-fde2-4e29-a699-b33035e5b44c",
                    "alergiaId": 13,
                    "createdAt": "2020-12-22T06:01:12.237Z",
                    "updatedAt": "2020-12-22T06:01:12.237Z"
                }
            },
            {
                "id": 14,
                "nombre": "agua",
                "medicamento": "alkoma",
                "createdAt": "2020-12-22T06:01:12.191Z",
                "updatedAt": "2020-12-22T06:01:12.191Z",
                "expedienteAlergia": {
                    "uuid": "7a9ef35f-fde2-4e29-a699-b33035e5b44c",
                    "alergiaId": 14,
                    "createdAt": "2020-12-22T06:01:12.253Z",
                    "updatedAt": "2020-12-22T06:01:12.253Z"
                }
            }
        ]
    },
]
```

## Obtener un expediente

GET `localhost:5000/api/:uuid`  
Sustituir con el uuid deseado que se puede consultar con el EP anterior. Regresa un objeto. Por ejemplo:

```JSON
{
    "uuid": "7a9ef35f-fde2-4e29-a699-b33035e5b44c",
    "nombre": "Juan Perez",
    "ultimaConsulta": "2020-12-22T06:01:12.135Z",
    "sangre": "O+",
    "createdAt": "2020-12-22T06:01:12.137Z",
    "updatedAt": "2020-12-22T06:01:12.137Z",
    "alergias": [
        {
            "id": 13,
            "nombre": "almendras",
            "medicamento": "ranitidina",
            "createdAt": "2020-12-22T06:01:12.191Z",
            "updatedAt": "2020-12-22T06:01:12.191Z",
            "expedienteAlergia": {
                "uuid": "7a9ef35f-fde2-4e29-a699-b33035e5b44c",
                "alergiaId": 13,
                "createdAt": "2020-12-22T06:01:12.237Z",
                "updatedAt": "2020-12-22T06:01:12.237Z"
            }
        },
        {
            "id": 14,
            "nombre": "agua",
            "medicamento": "alkoma",
            "createdAt": "2020-12-22T06:01:12.191Z",
            "updatedAt": "2020-12-22T06:01:12.191Z",
            "expedienteAlergia": {
                "uuid": "7a9ef35f-fde2-4e29-a699-b33035e5b44c",
                "alergiaId": 14,
                "createdAt": "2020-12-22T06:01:12.253Z",
                "updatedAt": "2020-12-22T06:01:12.253Z"
            }
        }
    ]
}
```

## Crear un expediente

POST `localhost:5000/api/`
En el cuerpo de tipo JSON debe de contener una estructura similar a la siguiente:

```JSON
{
    "nombre": "Juan Perez",
    "sangre": "o+",
    "alergias": [
        {
            "nombre": "almendras",
            "medicamento": "ranitidina"
        },
        {
            "nombre": "agua",
            "medicamento": "alkoma"
        }
    ]
}
```
