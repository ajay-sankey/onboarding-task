from django.db import models


class EmployeeRaw(models.Model):
    """Contains raw (unprocessed) data about employees"""
    employee_id    = models.AutoField(primary_key=True)
    salutation     = models.CharField(choices=[('mr', 'Mr'), ('ms', 'Ms'), ('mrs', 'Mrs')])
    first_name     = models.CharField()
    last_name      = models.CharField()
    personal_email = models.EmailField()
    full_name      = models.CharField(null=True)  # generated by workflow
    email          = models.EmailField(null=True) # generated by workflow
    password       = models.CharField(null=True)  # generated by workflow
    date_of_birth  = models.DateField()
    contact_number = models.CharField()
    position       = models.CharField(choices=[('solution_analyst', 'Solution Analyst'), ('solution_architect', 'Solution Architect')])
    role           = models.CharField(choices=[('admin', 'Admin'), ('read_only', 'Read Only')])
    city           = models.CharField()
    gender         = models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    is_synced      = models.BooleanField(default=False)
    is_active      = models.BooleanField(default=False)

    class Meta:
        db_table = 'employees_raw'

class Employee(models.Model):
    """Contains processed data about employees (process by workflow)"""
    employee_id    = models.IntegerField(primary_key=True)
    salutation     = models.CharField(choices=[('mr', 'Mr'), ('ms', 'Ms'), ('mrs', 'Mrs')])
    first_name     = models.CharField()
    last_name      = models.CharField()
    personal_email = models.EmailField()
    full_name      = models.CharField()  # generated by workflow
    email          = models.EmailField() # generated by workflow
    password       = models.CharField()  # generated by workflow
    date_of_birth  = models.DateField()
    contact_number = models.CharField()
    position       = models.CharField(choices=[('solution_analyst', 'Solution Analyst'), ('solution_architect', 'Solution Architect')])
    role           = models.CharField(choices=[('admin', 'Admin'), ('read_only', 'Read Only')])
    city           = models.CharField()
    gender         = models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    is_synced      = models.BooleanField(default=False)
    is_active      = models.BooleanField(default=False)

    class Meta:
        db_table = 'employees'
