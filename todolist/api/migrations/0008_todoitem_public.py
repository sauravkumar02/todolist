# Generated by Django 5.0.3 on 2024-03-12 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_todoitem_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='todoitem',
            name='public',
            field=models.BooleanField(default=False),
        ),
    ]