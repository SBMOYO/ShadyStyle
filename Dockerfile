FROM python:3.9.7-alpine

RUN pip install --upgrade pip

COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

COPY ./ShadyStyle /app

WORKDIR /app

COPY ./entrypoint.sh /entrypoint.sh
ENTRYPOINT ["sh", "/entrypoint.sh"]
