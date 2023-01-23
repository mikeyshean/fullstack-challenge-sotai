from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django_server.api.serializers import CpuHoursSerializer
from django_server.api.services import CpuHoursService


class CpuHoursViewSet(ViewSet):
    
    @action(detail=False, methods=["get"], url_path="daily-hours-by-year")
    def list_monthly_hours_by_year(self, request):
        params = request.query_params
        year = params.get("year")
        cpu_hours = CpuHoursService.list_monthly_hours_by_year(year)

        serializer = CpuHoursSerializer(cpu_hours, many=True)
        return Response(serializer.data)
