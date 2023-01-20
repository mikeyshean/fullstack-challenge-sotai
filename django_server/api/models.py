from django.db import models

class CpuHours(models.Model):
    date = models.DateField(null=False, blank=False, db_index=True)
    hours = models.DecimalField(null=False, blank=False, decimal_places=2, max_digits=6) 