#!/bin/bash
echo "Starting PostgreSQL container..."
docker-compose up -d

echo "Waiting 5 seconds for PostgreSQL to start..."
sleep 5

echo "Importing test data from dbTestData.sql..."
docker exec -i postgres psql -U $DB_USER -d $DB_NAME -f /docker-entrypoint-initdb.d/dbTestData.sql

echo "Done!"
