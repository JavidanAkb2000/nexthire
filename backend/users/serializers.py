from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    # Passwords must be write-only for security (never returned in API responses)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        # We must use create_user so Django hashes (encrypts) the password securely
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user