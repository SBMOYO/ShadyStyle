#!/bin/sh

# Retry function to wait for the database
retry_db_connection() {
    local max_attempts=10
    local attempt=1
    local db_host="sunglassshop-db-1"
    local db_port="5432"

    while ! nc -z "$db_host" "$db_port" && [ "$attempt" -le "$max_attempts" ]; do
        echo "Waiting for the database to be available (attempt $attempt)..."
        sleep 1
        attempt=$((attempt + 1))
    done

    if [ "$attempt" -gt "$max_attempts" ]; then
        echo "Error: Database connection timed out."
        exit 1
    fi
}

# Run Django database migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

# Start the Gunicorn server
gunicorn ShadyStyle.wsgi:application --bind 0.0.0.0:8000
