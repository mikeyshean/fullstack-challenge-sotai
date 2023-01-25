import datetime
from typing import List
from django_server.api.models import CpuHours
from django.db.models.functions import TruncMonth, TruncYear, ExtractWeekDay, ExtractWeek
from django.db.models import Sum


class CpuHoursService:

    def list_monthly_hours_by_year(year: int) -> List[CpuHours]:
        return CpuHours.objects.filter(
            date__year=year
        ).annotate(
            grouped_date=TruncMonth('date')
        ).values(
            'grouped_date'
        ).annotate(total=Sum('hours'))
    
    def list_yearly_hours_by_range(year_start: str, year_end: str) -> List[CpuHours]:
        start = datetime.date(int(year_start), 1, 1)
        end = datetime.date(int(year_end), 12, 31)

        return CpuHours.objects.filter(
            date__range=(start, end)
        ).annotate(
            grouped_date=TruncYear('date')
        ).values(
            'grouped_date'
        ).annotate(total=Sum('hours'))
   
    def list_weekday_hours_by_range(year_start: str, year_end: str) -> List[CpuHours]:
        start = datetime.date(int(year_start), 1, 1)
        end = datetime.date(int(year_end), 12, 31)
        
        return CpuHours.objects.filter(
            date__range=(start, end)
        ).annotate(
            grouped_weekday=ExtractWeekDay('date')
        ).values(
            'grouped_weekday'
        ).annotate(total=Sum('hours'))

    def list_weekly_hours_by_range(date_start: str, date_end: str) -> List[CpuHours]:
        start = datetime.datetime.strptime(date_start, '%m/%d/%Y').date()
        end = datetime.datetime.strptime(date_end, '%m/%d/%Y').date()

        return CpuHours.objects.filter(
            date__range=(start, end)
        ).annotate(
            grouped_week=ExtractWeek('date')
        ).values(
            'grouped_week'
        ).annotate(total=Sum('hours'))

    def list_years():
        return CpuHours.objects.dates('date', 'year', order='DESC')