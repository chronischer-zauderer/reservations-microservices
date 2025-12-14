#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://localhost:8080"
OUT_DIR="./integration_outputs"
mkdir -p "$OUT_DIR"

echo "1. GET /api/facilities"
curl -sS "$BASE_URL/api/facilities" | jq . > "$OUT_DIR/facilities.get.json"
echo " -> saved to $OUT_DIR/facilities.get.json"

echo "2. POST /api/facilities"
curl -sS -X POST "$BASE_URL/api/facilities" -H 'Content-Type: application/json' -d '{"name":"Sala Test","description":"Creada por script","capacity":5}' | jq . > "$OUT_DIR/facilities.post.json" || true

echo "3. GET /api/facilities (after create)"
curl -sS "$BASE_URL/api/facilities" | jq . > "$OUT_DIR/facilities.after_create.json"

echo "4. Create users"
curl -sS -X POST "$BASE_URL/api/auth/register" -H 'Content-Type: application/json' -d '{"username":"scriptuser","password":"pwd"}' | jq . > "$OUT_DIR/users.post.json" || true

echo "5. List users"
curl -sS "$BASE_URL/api/auth/users" | jq . > "$OUT_DIR/users.get.json"

echo "6. Create booking"
USER_ID=$(jq -r '.[0].id' "$OUT_DIR/users.get.json")
FAC_ID=$(jq -r '.[0].id' "$OUT_DIR/facilities.after_create.json")
curl -sS -X POST "$BASE_URL/api/bookings" -H 'Content-Type: application/json' -d "{\"facilityId\":$FAC_ID,\"userId\":$USER_ID,\"startTime\":\"2025-12-20T10:00:00\",\"endTime\":\"2025-12-20T11:00:00\"}" | jq . > "$OUT_DIR/booking.post.json" || true

echo "7. List bookings"
curl -sS "$BASE_URL/api/bookings" | jq . > "$OUT_DIR/bookings.get.json"

echo "Integration test outputs saved to $OUT_DIR"
