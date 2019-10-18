FROM ubuntu:18.04

RUN apt update
RUN apt install -y curl gnupg && curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt install -y nodejs nginx

WORKDIR /usr/src/app

COPY docker/nginx.conf /etc/nginx/sites-enabled/default

COPY ./ ./

RUN npm install && npm run build

CMD nginx -g 'daemon off;'
