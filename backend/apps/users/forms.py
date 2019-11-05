from django import forms

class RegisterUserForm(forms.Form):
    email = forms.CharField(
                max_length=254,
                widget=forms.TextInput(attrs={'class': "form-control"})
            )
    google_oauth2_client_id = forms.CharField(
                max_length=254,
                widget=forms.TextInput(attrs={'class': "form-control"})
            )
    google_oauth2_secrete = forms.CharField(
                max_length=254,
                widget=forms.TextInput(attrs={'class': "form-control"})
            )
    first_name = forms.CharField(
                max_length=50,
                widget=forms.TextInput(attrs={'class': "form-control"})
            )
    last_name = forms.CharField(
                max_length=50,
                widget=forms.TextInput(attrs={'class': "form-control"})
            )

    def on_register(self):
        pass