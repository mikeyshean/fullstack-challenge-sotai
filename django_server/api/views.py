from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django_server.api.serializers import HoursByDateSerializer, HoursByWeekSerializer, HoursByWeekdaySerializer
from django_server.api.services import CpuHoursService


class CpuHoursViewSet(ViewSet):
    
    @action(detail=False, methods=["get"], url_path="monthly-hours-by-year")
    def list_monthly_hours_by_year(self, request):
        params = request.query_params
        year = params.get("year")
        cpu_hours = CpuHoursService.list_monthly_hours_by_year(year=year)

        serializer = HoursByDateSerializer(cpu_hours, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"], url_path="yearly-hours-by-range")
    def list_yearly_hours_by_range(self, request):
        params = request.query_params
        year_start = params.get("year_start")
        year_end = params.get("year_end")
        cpu_hours = CpuHoursService.list_yearly_hours_by_range(year_start=year_start, year_end=year_end)

        serializer = HoursByDateSerializer(cpu_hours, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"], url_path="weekday-hours-by-range")
    def list_weekday_hours_by_range(self, request):
        params = request.query_params
        year_start = params.get("year_start")
        year_end = params.get("year_end")
        cpu_hours = CpuHoursService.list_weekday_hours_by_range(year_start=year_start, year_end=year_end)

        serializer = HoursByWeekdaySerializer(cpu_hours, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"], url_path="weekly-hours-by-range")
    def list_weekly_hours_by_range(self, request):
        params = request.query_params
        start = params.get("date_start")
        end = params.get("date_end")
        cpu_hours = CpuHoursService.list_weekly_hours_by_range(date_start=start, date_end=end)

        serializer = HoursByWeekSerializer(cpu_hours, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"], url_path="years")
    def list_years(self, request):
        years = CpuHoursService.list_years()
        return Response(years)
