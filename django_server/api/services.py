from typing import List
from django_server.api.models import CpuHours
from django.db.models.functions import TruncMonth
from django.db.models import Sum

class CpuHoursService:

    def list_monthly_hours_by_year(year: int) -> List[CpuHours]:
        return CpuHours.objects.filter(date__year=year).annotate(month=TruncMonth('date')).values('month').annotate(total=Sum('hours'))
