FROM ubuntu:18.04

COPY ./* /app

RUN apt-get update && apt-get upgrade
RUN apt install nodejs -y
RUN apt-get clean

EXPOSE 7889

CMD ["sh", "bootstrap.sh"]
