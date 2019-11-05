export const getSessionUser = () => {
  return (window.django && window.django.user ? window.django.user : {})
};

export const getSessionCsrf = () => {
  return (window.django && window.django.csrf
    ? window.django.csrf 
    : ''
  );
}

export const getOAuth2Token = () => {
  return (window.django && window.django.oauth2token
    ? window.django.oauth2token 
    : {}
  );
}