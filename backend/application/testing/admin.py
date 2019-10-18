from django.contrib import admin

from testing.models import Inquirer, Test, Category, Answer, Question, UserTest, UserInquirer

admin.site.register(Inquirer)
admin.site.register(Category)
admin.site.register(Test)
admin.site.register(Answer)
admin.site.register(Question)
admin.site.register(UserTest)
admin.site.register(UserInquirer)
