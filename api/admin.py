from django.contrib import admin
from .models import Blog,Likes,Comments
# Register your models here.
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
  list_display=['Category']

@admin.register(Likes)
class Likesadmin(admin.ModelAdmin):
  list_display=['id']


@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):
  list_display=['id']

