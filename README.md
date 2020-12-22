# EjercicioBackendExpediente

# Instrucciones de instalación

## 1. Instalar Postgres
Buscar las intrucciones según el sistema operativo o distribución.
Si está corriendo correctamente el siguiente comando debería de devolver la versión de postgres:

`psql --version`

## 2. Creación de usuario y base de datos
Ejecutar el comando para iniciar sesión con el usuario de postgres:  `sudo su postgres -c psql`  
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



