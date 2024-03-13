# Generated by Django 5.0.3 on 2024-03-12 08:14

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todoitem',
            name='image',
        ),
        migrations.AlterField(
            model_name='todoitem',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]