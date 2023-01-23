from rest_framework.routers import SimpleRouter

from django_server.api.views import CpuHoursViewSet

router = SimpleRouter(trailing_slash=False)
router.register("cpuhours", CpuHoursViewSet, basename="cpuhours")
