# Generated by Django 2.1.1 on 2018-10-21 16:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('testing', '0002_auto_20181021_1520'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertest',
            name='user_inquirer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tests', to='testing.UserInquirer'),
        ),
    ]
