Proyecto de ejemplo: sistema de reservas basado en microservicios.

Servicios:
- `auth-service` (puerto 8081)
- `facility-service` (puerto 8082)
- `booking-service` (puerto 8083)

Levantar con Docker Compose:

```bash
docker-compose -f docker-compose.clean.yml up --build
```

Credenciales de la base de datos MySQL (inicializadas por Compose):
- Base de datos: `reservations_db`
- Usuario: `app`
- Contraseña: `apppassword`

Pruebas REST rápidas:

```bash
# listar instalaciones
curl http://localhost:8082/api/facilities

# crear una instalación
curl -X POST -H "Content-Type: application/json" -d '{"name":"Sala A","capacity":10,"description":"Prueba"}' http://localhost:8082/api/facilities

# listar reservas
curl http://localhost:8083/api/bookings
```

Notas:
- Eliminada la clave `version` en `docker-compose.clean.yml` para evitar la advertencia de Compose.
- Si quieres que renombre `docker-compose.clean.yml` a `docker-compose.yml` y haga commit, indícalo.

Puertos expuestos localmente:
- MySQL: 3306
- Auth: 8081
- Facility: 8082
- Booking: 8083

Archivo usado para pruebas: [docker-compose.clean.yml](docker-compose.clean.yml)

Fichero principal de la app: [README.md](README.md)

¡Listo para pruebas locales!