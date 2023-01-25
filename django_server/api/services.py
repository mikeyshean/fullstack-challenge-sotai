import datetime
from typing import List
from django_server.api.models import CpuHours
from django.db.models.functions import TruncMonth, TruncYear, ExtractWeekDay
from django.db.models import Sum


class CpuHoursService:

    def list_monthly_hours_by_year(year: int) -> List[CpuHours]:
        return CpuHours.objects.filter(date__year=year).annotate(grouped_date=TruncMonth('date')).values('grouped_date').annotate(total=Sum('hours'))
    
    def list_yearly_hours_by_range(year_start: str, year_end: str) -> List[CpuHours]:
        start_date = datetime.date(int(year_start), 1, 1)
        end_date = datetime.date(int(year_end), 12, 31)
        return CpuHours.objects.filter(date__range=(start_date, end_date )).annotate(grouped_date=TruncYear('date')).values('grouped_date').annotate(total=Sum('hours'))
   
    def list_weekday_hours_by_range(year_start: str, year_end: str) -> List[CpuHours]:
        start_date = datetime.date(int(year_start), 1, 1)
        end_date = datetime.date(int(year_end), 12, 31)
        return CpuHours.objects.filter(date__range=(start_date, end_date )).annotate(grouped_weekday=ExtractWeekDay('date')).values('grouped_weekday').annotate(total=Sum('hours'))
