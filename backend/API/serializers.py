from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import TestModel


class TestSerializer(ModelSerializer):

    class Meta:
        model = TestModel
        fields = ['user', 'message']
