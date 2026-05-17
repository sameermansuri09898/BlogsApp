from django.template.defaultfilters import default
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# Create your models here.
class User(AbstractUser):
    mobile = models.CharField(max_length=10, unique=True)
    is_verified = models.BooleanField(default=False)
    
    
    
class Otp(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=4)
    otp_created_at = models.DateTimeField(auto_now_add=True)

    def is_otp_expired(self):
        return self.otp_created_at + timezone.timedelta(minutes=10) < timezone.now()

    def __str__(self):
        return self.user.username
    
class Blog(models.Model):
    bloggers = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=40)
    description = models.TextField()
    image = models.ImageField(upload_to='blogs_image/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comments(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="comment")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comnt = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Likes(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="blog")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at=models.DateField(auto_now_add=True)
    class Meta:
        unique_together = ('blog', 'user')
    