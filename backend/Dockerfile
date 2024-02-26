FROM python:3.11-slim-bookworm

RUN apt update && \
    apt upgrade -y

WORKDIR /backend

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY manage.py .
COPY backend .

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
