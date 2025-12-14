#!/usr/bin/env sh
# Wait for upstream services to be reachable, then start nginx in foreground.
set -eu

echo "[gateway] waiting for auth-service:8081..."
while ! nc -z auth-service 8081; do
  sleep 1
done
echo "[gateway] auth-service reachable"

echo "[gateway] waiting for facility-service:8082..."
while ! nc -z facility-service 8082; do
  sleep 1
done
echo "[gateway] facility-service reachable"

echo "[gateway] waiting for booking-service:8083..."
while ! nc -z booking-service 8083; do
  sleep 1
done
echo "[gateway] booking-service reachable"

echo "[gateway] starting nginx..."
exec nginx -g 'daemon off;'
