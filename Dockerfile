# The first instruction is what image we want to base our container on
# We Use an official Python runtime as a parent image
FROM python:3.6
# FROM nikolaik/python-nodejs:python3.6-nodejs12-stretch

# Install node 12.8.1
RUN \
  apt-get update && \
  apt-get install -yqq apt-transport-https
RUN \
  echo "deb https://deb.nodesource.com/node_12.x stretch main" > /etc/apt/sources.list.d/nodesource.list && \
  wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list && \
  wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  apt-get update && \
  apt-get install -yqq nodejs=$(apt-cache show nodejs|grep Version|grep nodesource|cut -c 10-) yarn && \
  apt-mark hold nodejs && \
  pip install -U pip && pip install pipenv && \
  npm i -g npm@^6 && \
  rm -rf /var/lib/apt/lists/*
  
# Setup Ubuntu linux
RUN export LANGUAGE="en_US.UTF-8"
RUN mkdir -p /usr/src/youta

WORKDIR /usr/src/youta
RUN mkdir -p /usr/src/youta/run

COPY requirements.txt /usr/src/youta/

RUN pip install -r requirements.txt

COPY . /usr/src/youta/
RUN cd /usr/src/youta/

ENV DATABASE_NAME youta
ENV DATABASE_USERNAME postgres
ENV DATABASE_PASSWORD postgres
ENV DATABASE_HOST db
ENV DATABASE_PORT 5432
ENV GOOGLE_CALENDAR_API_REDIRECT_URI https://www.youtahq.com/register/access_token

RUN mkdir -p /usr/src/youta/static
RUN mkdir -p /usr/src/youta/backend/static
RUN cd /usr/src/youta/frontend/ && yarn install && yarn build
# RUN ls -al /usr/src/youta/frontend/build/

RUN cd /usr/src/youta/
# RUN mkdir /usr/src/youta/static
# RUN python manage.py migrate
RUN python manage.py collectstatic

RUN ls -al /usr/src/youta/static/

RUN cp -rf /usr/src/youta/frontend/build/* /usr/src/youta/static/
#RUN cd /usr/src/youta/frontend/ && yarn install && yarn build

EXPOSE 8000

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
