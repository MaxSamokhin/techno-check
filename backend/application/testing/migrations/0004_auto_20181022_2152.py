# Generated by Django 2.1.1 on 2018-10-22 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testing', '0003_auto_20181021_1658'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertest',
            name='finished_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='usertest',
            name='started_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
