from rest_framework import serializers

class CpuHoursSerializer(serializers.Serializer):
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    month = serializers.DateField()
    
