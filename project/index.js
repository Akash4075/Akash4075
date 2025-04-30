// If user already logged in, redirect to dashboard
window.onload = () => {
  const loggedUser = localStorage.getItem('loggedInUser');
  if (loggedUser) {
    window.location.href = 'dashboard.html';
  }
};

function goToLogin() {
  window.location.href = 'login.html';
}

function goToSignup() {
  window.location.href = 'signup.html';
}
