from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
import sqlite3

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2022, 1, 1),
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'fetch_and_append_data',
    default_args=default_args,
    description='Fetch and append data from one table to another',
    schedule_interval='@hourly',
)

def fetch_and_append_data(**kwargs):
    # Connect to source SQLite database
    source_conn = sqlite3.connect('/path/to/source.db')
    source_cursor = source_conn.cursor()

    # Connect to destination SQLite database
    destination_conn = sqlite3.connect('/path/to/destination.db')
    destination_cursor = destination_conn.cursor()

    # Fetch data from source table
    source_cursor.execute('SELECT * FROM source_table')
    data_to_append = source_cursor.fetchall()

    # Append data to destination table
    for row in data_to_append:
        destination_cursor.execute("INSERT INTO destination_table VALUES (?, ?, ?, ?)", row)
    destination_conn.commit()

    source_cursor.close()
    destination_cursor.close()
    source_conn.close()
    destination_conn.close()

t1 = PythonOperator(
    task_id='fetch_and_append_data',
    python_callable=fetch_and_append_data,
    dag=dag,
)

t1
