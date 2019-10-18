import json

from django.test import TestCase

# initialize the APIClient app
from users.models import User


class AuthTest(TestCase):

    def setUp(self):
        user = User.objects.create(email='admin@admin.ru')
        user.set_password('admin')
        user.is_superuser = True
        user.save()

    def login_as_admin(self):
        self.client.post('/api/auth/login', json.dumps({'email': 'admin@admin.ru', 'password': 'admin'}),
                         content_type='application/json')

    def test_login(self):
        response = self.client.post('/api/auth/login', json.dumps({'email': 'admin@admin.ru', 'password': 'admin'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'ok')

    def test_me_unauthorized(self):
        response = self.client.get('/api/auth/me')
        self.assertEqual(response.status_code, 404)

    def test_me_authorized(self):
        self.login_as_admin()

        response = self.client.get('/api/auth/me')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'email': 'admin@admin.ru', 'is_superuser': True})
