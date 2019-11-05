from __future__ import unicode_literals

from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin,
                                        BaseUserManager)
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class EmailUserManager(BaseUserManager):
    def _create_user(self, email, password, is_staff, is_superuser,
                     **extra_fields):
        now = timezone.now()

        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        is_active = extra_fields.pop("is_active", True)

        user = self.model(
            email=email,
            is_staff=is_staff,
            is_active=is_active,
            is_superuser=is_superuser,
            last_login=now,
            date_joined=now,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        is_staff = extra_fields.pop("is_staff", False)

        return self._create_user(
            email,
            password,
            is_staff,
            False,
            **extra_fields
        )

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(
            email, password,
            True,
            True,
            **extra_fields
        )


class EmailUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(
        max_length=254,
        unique=True,
        error_messages={
            'unique': 'That email address is already taken.'
        }
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)
    google_oauth2_client_id = models.CharField(max_length=254, blank=True, default='')
    google_oauth2_secrete = models.CharField(max_length=254, blank=True, default='')

    objects = EmailUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __unicode__(self):
        return self.email

    def get_short_name(self):
        return '{first_name}'.format(
            first_name=self.first_name
        )

    def get_full_name(self):
        return '{first_name} {last_name}'.format(
            first_name=self.first_name,
            last_name=self.last_name,
        )

    class Meta:
        permissions = (
            ('view_emailuser', 'Can view email users'),
        )
        ordering = ['-id']
        default_permissions = ('add', 'change', 'delete')


class Oauth2Token(models.Model):
    user = models.OneToOneField(
        EmailUser,
        related_name='user_oauth2token',
        on_delete=models.CASCADE,
        primary_key=True,
    )
    access_token = models.CharField(max_length=254, blank=False, default='')
    refresh_token = models.CharField(max_length=254, blank=False, default='')
    token_expiry = models.CharField(max_length=254, blank=False, default='')
    code = models.CharField(max_length=254, blank=True)
    text = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{access_token}'.format(access_token=self.access_token)

    class Meta:
        ordering = ('user', 'updated_at')
        unique_together = ('user',)
        verbose_name = _("UserOauth2Token")
        verbose_name_plural = _("UserOauth2Tokens")
        managed = True