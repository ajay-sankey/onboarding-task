from django.db import models

class User(models.Model):
    user_id     = models.CharField(max_length=50, unique=True)
    first_name  = models.CharField(max_length=100)
    last_name   = models.CharField(max_length=100)
    email       = models.EmailField(unique=True)
    mobile_no   = models.CharField(max_length=15)
    address     = models.TextField(null=True)
    dob         = models.DateField(null=True)
    gender      = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    is_active   = models.BooleanField(default=False)
    is_synced   = models.BooleanField(default=False)
    role        = models.CharField(max_length=10, choices=[('admin', 'Admin'), ('creator', 'Creator'), ('logger', 'Logger'), ('user', 'User')])

    class Meta:
        db_table = 'users'

class UserMaster(models.Model):
    user_id     = models.CharField(max_length=50, unique=True)
    first_name  = models.CharField(max_length=100)
    last_name   = models.CharField(max_length=100)
    email       = models.EmailField(unique=True)
    mobile_no   = models.CharField(max_length=15)
    address     = models.TextField(null=True)
    dob         = models.DateField(null=True)
    gender      = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    is_active   = models.BooleanField(default=False)
    is_synced   = models.BooleanField(default=False)
    role        = models.CharField(max_length=10, choices=[('admin', 'Admin'), ('creator', 'Creator'), ('logger', 'Logger'), ('user', 'User')])

    class Meta:
        db_table = 'users_master'
