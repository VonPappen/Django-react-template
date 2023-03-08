
from django.test import TestCase
from django.contrib.auth import get_user_model
import pdb

User = get_user_model()


class Test_User_Model(TestCase):

    email = "test@test.test"
    password = "testPassword1234"
    username = "testSubject"

    adminEmail = "admin@test.test"
    adminPassword = "adminPassword1234"
    adminUsername = "adminSubject"

    # initial setup
    def setUp(self):
        User.objects.create_user(self.username, self.email, self.password)
        User.objects.create_superuser(
            self.adminUsername, self.adminEmail, self.adminPassword)

    # testing user cases
    def test_create_user(self):
        newUser = User.objects.get(email=self.email)
        self.assertIsInstance(newUser, User)

    def test_no_username_set(self):
        with self.assertRaises(ValueError):
            User.objects.create_user(
                username=None, email=self.email, password=self.password
            )

    def test_no_email_set(self):
        with self.assertRaises(ValueError):
            User.objects.create_user(
                username=self.username, email=None, password=self.password
            )

    # Testing superuser cases
    def test_create_super_user(self):
        newSuperUser = User.objects.get(email=self.adminEmail)
        self.assertIsInstance(newSuperUser, User)

    def test_superuser_is_staff_false_value_error(self):
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                self.adminUsername, self.adminEmail, self.adminPassword, is_staff=False
            )

    def test_superuser_is_superuser_value_error(self):
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                self.adminUsername, self.adminEmail, self.adminPassword, is_superuser=False
            )
