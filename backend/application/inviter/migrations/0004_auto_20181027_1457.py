# Generated by Django 2.1.1 on 2018-10-27 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inviter', '0003_auto_20181023_0930'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invitejob',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='invitejob',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
