FROM python:3.11-slim-bookworm

RUN apt update && \
    apt upgrade

# https://youtu.be/YDDMm9M6SFA
# https://airflow.apache.org/docs/apache-airflow/stable/start.html
RUN pip install apache-airflow==2.8.1 --constraint https://raw.githubusercontent.com/apache/airflow/constraints-2.8.1/constraints-no-providers-3.11.txt

# https://docs.docker.com/config/containers/multi-service_container/#use-a-process-manager
RUN pip install supervisor

COPY supervisord.conf /etc/

COPY dags /root/airflow/dags

RUN airflow db migrate

RUN airflow users create \
    --username admin \
    --password pass@123 \
    --firstname Ajay \
    --lastname Dandge \
    --role Admin \
    --email admin@onboarding.task

CMD ["supervisord"]
