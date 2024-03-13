from django.db import models
import uuid

class TodoItem(models.Model):
    user_id = models.IntegerField(default=0)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    background_color = models.CharField(max_length=20, default='#FFFFFF')
    pinned = models.BooleanField(default=False)
    public = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class EchoItem(models.Model):
    user_id = models.IntegerField(default=0)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    background_color = models.CharField(max_length=20, default='#FFFFFF')
    pinned = models.BooleanField(default=False)
    public = models.BooleanField(default=False)

    def __str__(self):
        return self.title