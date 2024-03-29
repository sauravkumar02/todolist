# Generated by Django 5.0.3 on 2024-03-12 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_todoitem_public'),
    ]

    operations = [
        migrations.CreateModel(
            name='EchoItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('background_color', models.CharField(default='#FFFFFF', max_length=20)),
                ('pinned', models.BooleanField(default=False)),
                ('public', models.BooleanField(default=False)),
            ],
        ),
    ]
