# Generated by Django 2.1.1 on 2018-10-28 15:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('testing', '0008_auto_20181028_1525'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserCategoryResults',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='testing.Category')),
            ],
        ),
        migrations.CreateModel(
            name='UserInquirerResult',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inquirer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='testing.Inquirer')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user_inquirer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='testing.UserInquirer')),
            ],
        ),
        migrations.CreateModel(
            name='UserTestResults',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField()),
                ('inquirer_results', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='test_results', to='results.UserInquirerResult')),
                ('test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='testing.Test')),
                ('user_test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='testing.UserTest')),
            ],
        ),
        migrations.AddField(
            model_name='usercategoryresults',
            name='test_results',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category_results', to='results.UserTestResults'),
        ),
    ]
