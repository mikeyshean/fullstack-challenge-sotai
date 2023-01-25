from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django_server.api.serializers import MonthlyCpuHoursSerializer, YearlyCpuHoursSerializer
from django_server.api.services import CpuHoursService


class CpuHoursViewSet(ViewSet):
    
    @action(detail=False, methods=["get"], url_path="monthly-hours-by-year")
    def list_monthly_hours_by_year(self, request):
        params = request.query_params
        year = params.get("year")
        cpu_hours = CpuHoursService.list_monthly_hours_by_year(year=year)

        serializer = MonthlyCpuHoursSerializer(cpu_hours, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"], url_path="yearly-hours-by-range")
    def list_yearly_hours_by_range(self, request):
        params = request.query_params
        year_start = params.get("year_start")
        year_end = params.get("year_end")
        cpu_hours = CpuHoursService.list_yearly_hours_by_range(year_start=year_start, year_end=year_end)

        serializer = YearlyCpuHoursSerializer(cpu_hours, many=True)
        return Response(serializer.data)
