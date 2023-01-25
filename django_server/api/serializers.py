from rest_framework import serializers

class HoursByDateSerializer(serializers.Serializer):
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    grouped_date = serializers.DateField()


class HoursByWeekdaySerializer(serializers.Serializer):
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    grouped_weekday = serializers.IntegerField()


class HoursByWeekSerializer(serializers.Serializer):
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    grouped_week = serializers.IntegerField()
