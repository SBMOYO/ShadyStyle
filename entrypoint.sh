#!/bin/sh

# Wait for the database to be available
# while ! nc -z db 5432; do
#   sleep 1
# done

# Run Django database migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

# Start the Gunicorn server
gunicorn ShadyStyle.wsgi:application --bind 0.0.0.0:8000
