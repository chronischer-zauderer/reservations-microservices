# Reservations Microservices

Proyecto de ejemplo: sistema de reservas construido con microservicios Spring Boot, MySQL y un API Gateway estático (nginx) que además sirve una SPA React mínima.

Contenido del repositorio
- `auth-service/` — microservicio para manejo de usuarios (registro/listado/edición).
- `facility-service/` — microservicio para facilities y equipment.
- `booking-service/` — microservicio para reservas (referencia a facilityId y userId).
- `gateway/` — nginx que sirve la SPA estática y hace proxy de `/api/*` hacia los microservicios.
- `docker-compose.yml` — orquesta la base de datos y los servicios.
- `scripts/integration_test.sh` — script de ejemplo para pruebas de integración y generación de evidencias en `integration_outputs/`.

Requisitos principales cubiertos
- Microservicios Java (Spring Boot + JPA/Hibernate).
- Persistencia en MySQL con tablas: `facility`, `equipment`, `users`, `booking`.
- Contenerización con Docker y orquestación básica con `docker-compose`.
- API Gateway con nginx que proxyea las rutas `/api/*` y sirve la UI en `/`.
- Patrón DTO + Service + Repository aplicado a los endpoints principales.

Requisitos previos
- Docker y Docker Compose instalados.
- (Opcional) Maven si quieres construir manualmente los servicios.

Arranque rápido (modo recomendado)

1) Construir y subir el stack con Docker Compose:

```bash
docker compose up --build -d
```

2) Verifica que los contenedores estén corriendo:

```bash
docker ps
```

3) Verifica rápidamente los endpoints vía API Gateway (ejemplos):

```bash
# Listar facilities a través del gateway
curl -sS http://localhost:8080/api/facilities | jq

# Listar usuarios
curl -sS http://localhost:8080/api/auth/users | jq

# Listar bookings
curl -sS http://localhost:8080/api/bookings | jq
```

Notas útiles
- Si ves `502 Bad Gateway` en el gateway justo después del arranque, espera unos segundos y reinicia el contenedor del gateway; el proyecto ya incluye `gateway/wait-and-run.sh` para evitar este problema arrancando nginx hasta que los upstreams respondan.
- La UI estática se sirve en `http://localhost:8080/` (navegador) y consume los endpoints proxyeados en `/api/*`.

Verificación de la base de datos

Puedes comprobar que las 4 tablas mínimas existen y ver sus conteos con:

```bash
docker exec reservations-microservices-db-1 \
  mysql -u root -prootpassword -e "USE reservations_db; SHOW TABLES; SELECT COUNT(*) FROM facility; SELECT COUNT(*) FROM users; SELECT COUNT(*) FROM booking; SELECT COUNT(*) FROM equipment;"
```

Evidencias y pruebas de integración
- Se incluye `scripts/integration_test.sh` que ejecuta una serie de peticiones (GET/POST/PUT/DELETE) y guarda las respuestas en `integration_outputs/`. Usa ese script para generar JSONs de evidencia que puedes incluir en la entrega.

Construcción individual (opcional)
- Para compilar un servicio manualmente (ejemplo `facility-service`):

```bash
cd facility-service/facility-service
./mvnw -DskipTests package
```

Buenas prácticas y próximos pasos recomendados
- Generar README y un PDF de entrega que incluya la descripción, el diagrama de arquitectura, los comandos ejecutados y las salidas en `integration_outputs/` (puedo generar el PDF si lo deseas).
- Añadir pruebas automáticas (unit/integration) y configurar CI (GitHub Actions).
- Si el enunciado exige un frontend con build, convertir la UI estática a un proyecto React/Vite con su Dockerfile y añadirlo al `docker-compose`.
- Mejorar seguridad en `auth-service` (BCrypt para contraseñas, JWT para autenticación) si es requerido por la evaluación.

Contacto
Si quieres que genere ahora el README con capturas y el PDF final de entrega o que ejecute las pruebas unitarias, dime y lo hago. 

---
Fechado: 14-12-2025
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