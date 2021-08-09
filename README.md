
## Description

Colector Desechos Sólidos es un sistema para que los ayuntamientos puedan trazar rutas inteligentes para recoger solo los contenedores que requieren dicho servicio. Esto evaluando los dispositivos IoT que están en cada contenedor para determinar si este posee o no desechos sólidos.

## Instalación

```bash
$ npm install
```

## Variables de Entorno

Crear archivo .env en la ruta raiz de la aplicación con las siguientes variables

```bash

# Tipo de base de datos ==> Postgres

POSTGRES_HOST=[DB_HOST] # reemplazar por host de la base de datos
POSTGRES_PORT=[DB_PORT] # reemplazar por puerto de la base de datos
POSTGRES_USER=[DB_USER] # reemplazar por usuario de conexion a la base de datos
POSTGRES_PASSWORD=[DB_PASSWORD] # reemplazar por password del usuario de base de datos
POSTGRES_DATABASE=[DB_NAME] # reemplazar por nombre de la base de datos
MODE=[APP_MODE] # DEV o PROD
COOKIE_TOKEN_KEY=CDS_BACKEND_API_TOKEN # Mantener este valor por defecto
JWT_SECRET_KEY=[JWT_SECRET] # reemplazar por cadena de texto para firma de los token
JWT_EXPIRES_IN=[JWT_EXPIRES_IN] # reemplazar por valor numerico de tiempo de vigencia de los token en minutos. ejemplo 15 ==> 15 minutos de inactividad, 0.5 ==> 30 segundos de inactividad 
GOOGLE_API_KEY=[G_API_KEY] # reemplazar por el api key de Google Platform
GOOGLE_DISTANCE_API=https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=:LOCATIONSO&destinations=:LOCATIONSD&key=:API_KEY  # Mantener este valor por defecto
GOOGLE_GEOLOCATION_API=https://www.googleapis.com/geolocation/v1/geolocate?key=:API_KEY  # Mantener este valor por defecto

```

## Correr el APP

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Colaboradores

- Author - [Edward Jimenez](https://github.com/edwardjjc)
- Author - [Rosalina Nolberto]()
