from django.urls import path
from .views import register,login,logout,VericationOtp,ResendOtp,ChangePasswordView
from rest_framework import routers
from .views import blogcview

 # <-- Blogs part urls ---->

router=routers.DefaultRouter()
router.register(r'Blogs',blogcview,basename='Blogss')



urlpatterns = [
    path('register/',register.as_view(),name='register'),
    path('login/',login.as_view(),name='login'),
    path('logout/',logout.as_view(),name='logout'),
    path('verifyotp/',VericationOtp.as_view(),name='verifyotp'),
    path('resendotp/',ResendOtp.as_view(),name='resendotp'),
    path('change-password/',ChangePasswordView.as_view(),name='change-password'),

    # <-- Blogs part urls ---->

  

]
urlpatterns+=router.urls