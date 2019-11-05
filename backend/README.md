# Django Application Server

## Primary Modules
1. [django](https://www.djangoproject.com/)
1. [django rest framework](http://www.django-rest-framework.org/)

## Prerequisites
1. Postgres
1. Python

## Installation
```
pip install -r backend/requirements/devl.pip
createdb $project_name
python manage.py migrate
python manage.py loadtestdata users.EmailUser:100
python manage.py createsuperuser
python manage.py runserver
```
