from rest_framework import serializers

class MonthlyCpuHoursSerializer(serializers.Serializer):
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    month = serializers.DateField()


class YearlyCpuHoursSerializer(serializers.Serializer):
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    year = serializers.DateField()
    
