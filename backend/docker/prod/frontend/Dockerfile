FROM ubuntu:18.04

RUN apt update && apt install -y python3.6 python3-pip python3.6-dev

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip3 install -r requirements.txt

COPY ./ ./

WORKDIR /usr/src/app/application


CMD gunicorn application.wsgi:application --bind 0.0.0.0:80 -w 2 --threads 4