import sys

from datetime import datetime

import airflow_client.client as client

from airflow_client.client.api import dag_run_api
from airflow_client.client.model.dag_run import DAGRun
from rest_framework.views import APIView

sys.setrecursionlimit(1500)

configuration = client.Configuration(host='http://localhost:8080/api/v1', username='admin', password='admin')

class TriggerWorkflowView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # user = authenticate(username=username, password=password)
        user = True
        if user:
            from . import airflow
            return Response({
                'message': 'test'
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


with client.ApiClient(configuration) as api_client:
    api_instance = dag_run_api.DAGRunApi(api_client)
    dag_id = 'demo_dag'
    dag_run = DAGRun(
        dag_run_id='demo_dag_run_1',
        logical_date=datetime.fromisoformat('1970-01-01T00:00:00.00Z'),
        execution_date=datetime.fromisoformat('1970-01-01T00:00:00.00Z'),
        conf={},
        note='note_example',
    )
    
    try:
        api_response = api_instance.post_dag_run(dag_id, dag_run)
    except client.ApiException as e:
        print('Exception when calling DAGRunApi -> post_dag_run:', e)