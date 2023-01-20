from django.core.management.base import BaseCommand
from django.db import transaction
import csv
from pathlib import Path
import datetime
from django_server.api.models import CpuHours



class Command(BaseCommand):
    @transaction.atomic
    def handle(self, **options):
        """
        Seed database with cpu_hours.csv data
        """
        
        base_path = Path(__file__).parent
        file_path = (base_path / "cpu_hours.csv").resolve()
        
        with open(file_path, newline='') as csvfile:
            reader = csv.reader(csvfile, delimiter=',', quotechar='|')
            for idx, row in enumerate(reader):
                if idx == 0: continue
                
                year, month, day, cpu_hours = row[0], row[1], row[2], row[3]
                date = datetime.date(int(year), int(month), int(day))
                
                CpuHours.objects.create(date=date, hours=cpu_hours)
                print(f"Creating CpuHour record for {date.__str__()}: ${cpu_hours} hours")


