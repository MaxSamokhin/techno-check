from users.models import User


def test_me_authorized_client(client, admin_user):
    client.force_login(admin_user)
    response = client.get('/api/auth/me')
    assert response.status_code == 200
    assert response.json() == {'email': 'admin@example.com', 'is_superuser': True}


def test_auth_user(client, transactional_db):
    admin = User(email='admin@admin.ru')
    admin.set_password('admin')
    admin.save()

    data = {
        'email': 'admin@admin.ru',
        'password': 'admin'
    }

    response = client.post('/api/auth/login', data=data, content_type='application/json')

    assert response.status_code == 200
    assert response.json() == {'status': 'ok'}
