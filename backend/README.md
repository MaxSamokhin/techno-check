# Test-utils project for Technopark

## Install docker & docker-compose

See:

https://docs.docker.com/compose/install/
https://docs.docker.com/install/linux/docker-ce/ubuntu/

## How to start

1. Run `docker-compose up` (rerun after first start. Some problems with db creation, django application crashes. Will think about it later :D)
2. Done!

### Create superuser

1. Run `docker-compose exec backend ./manage.py createsuperuser`
2. Fill user info (username, email, password)
3. Done!