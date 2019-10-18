from django.urls import path, include

urlpatterns = [
    path('testing', include('administration.testing.urls')),
    path('results', include('administration.results.urls')),
    path('review', include('administration.review.urls'))

]
